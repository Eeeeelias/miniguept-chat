import glob
import logging
import os
import pickle
import random
import re
import shutil
from typing import List

import numpy as np
import torch
from torch.utils.data import Dataset
from transformers import (
    PreTrainedTokenizer,
)

logger = logging.getLogger(__name__)


class ConversationDataset(Dataset):
    def __init__(self, tokenizer: PreTrainedTokenizer, args, df, block_size=512):

        block_size = block_size - (tokenizer.model_max_length - tokenizer.max_len_single_sentence)
        directory = args.cache_dir
        cached_features_file = os.path.join(directory, args.model_type + "_cached_lm_" + str(block_size))

        if os.path.exists(cached_features_file) and not args.overwrite_cache:
            logger.info("Loading features from cached file %s", cached_features_file)
        else:
            logger.info("Creating features from dataset file at %s", directory)

            self.exmaple = []
            for _, row in df.iterrows():
                conv = self.construct_conv(row, tokenizer)
                self.exmaple.append(conv)

            logger.info("Saving features into cached file %s", cached_features_file)
            with open(cached_features_file, "wb") as handle:
                pickle.dump(self.exmaple, handle, protocol=pickle.HIGHEST_PROTOCOL)

    def __len__(self):
        return len(self.exmaple)

    def __getitem__(self, item):
        return torch.tensor(self.exmaple[item], dtype=torch.long)

    @staticmethod
    def construct_conv(row, tokenizer, eos=True):
        flatten = lambda l: [item for sublist in l for item in sublist]
        # print(tokenizer.eos_token, tokenizer.eos_token_id) -> <|endoftext|> 50256
        conv = list(reversed([tokenizer.encode(x) + [tokenizer.eos_token_id] for x in row]))
        conv = flatten(conv)
        return conv


def load_and_cache_examples(args, tokenizer, df_trn, df_val, evaluate=False):
    return ConversationDataset(tokenizer, args, df_val if evaluate else df_trn)


def _sorted_checkpoints(args, checkpoint_prefix="checkpoint", use_mtime=True) -> List[str]:
    ordering_and_checkpoint_path = []
    glob_checkpoints = glob.glob(os.path.join(args.output_dir, f"{checkpoint_prefix}-*"))

    for path in glob_checkpoints:
        if use_mtime:
            ordering_and_checkpoint_path.append((os.path.getmtime(path), path))
        else:
            regex_match = re.match(":*{}-([0-9]+)".format(checkpoint_prefix), path)
            if regex_match and regex_match.groups():
                ordering_and_checkpoint_path.append((int(regex_match.groups()[0]), path))

    checkpoints_sorted = sorted(ordering_and_checkpoint_path)
    checkpoints_sorted = [checkpoint[1] for checkpoint in checkpoints_sorted]

    return checkpoints_sorted


def _rotate_checkpoints(args, checkpoint_prefix="checkpoint", use_mtime=False) -> None:
    if not args.save_total_limit:
        return
    if args.save_total_limit <= 0:
        return

    checkpoint_sorted = _sorted_checkpoints(args, checkpoint_prefix, use_mtime)
    if len(checkpoint_sorted) <= args.save_total_limit:
        return

    number_of_checkpoints_to_delete = max(0, len(checkpoint_sorted) - args.save_total_limit)
    checkpoints_to_be_deleted = checkpoint_sorted[:number_of_checkpoints_to_delete]
    for checkpoint in checkpoints_to_be_deleted:
        logger.info("Deleting older checkpoint [{}] due to args.save_total_limit".format(checkpoint))
        shutil.rmtree(checkpoint)


def set_seed(args):
    random.seed(args.seed)
    np.random.seed(args.seed)
    torch.manual_seed(args.seed)
    if args.n_gpu > 0:
        torch.cuda.manual_seed_all(args.seed)
