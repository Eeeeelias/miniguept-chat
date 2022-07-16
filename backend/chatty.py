import os

from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

models = {'elias': 'models/output-big-elias',
          'elias-bgi': 'models/output-big-elias-improved',
          'rick': 'models/output-trash-rick'}

# Initialize variables
tokenizer = AutoTokenizer.from_pretrained("microsoft/DialoGPT-small")
eos_token = 50256
model = None
step = 1
prev_model = "elias"
user_model = AutoModelForCausalLM.from_pretrained(models.get('elias'))

def set_model(model_name):
    global user_model
    user_model = AutoModelForCausalLM.from_pretrained(model_name)


def tokenize_input(user_input):
    return tokenizer.encode(user_input + tokenizer.eos_token, return_tensors='pt')


def add_context(user_input_id, context_ids, context, reset_step=False):
    global step

    if reset_step:
        step = 1

    if context_ids is None:
        bot_input_ids = user_input_id
    else:
        # the oldest (given context) input gets removed from the tensor to keep the max_length under 256
        if step >= context:
            index = 0
            second = False
            # gives tensor(<value>) which can be compared to an int
            for t in context_ids[0]:
                if t == eos_token:
                    if second:
                        break
                    second = True
                index += 1
            context_ids = context_ids[:, index + 1:]

        bot_input_ids = torch.cat([context_ids, user_input_id], dim=-1)
    step += 1

    return bot_input_ids


def cat_tensors(tensor_list):
    return torch.cat(tensor_list, dim=-1)


def len_tensors(tensor):
    return tensor.size(dim=-1)


def get_reply(bot_input_ids, reply_model):
    # user_model gets updated with each function call -> causes referenced before assignment error
    global prev_model
    global user_model
    if reply_model != prev_model:
        user_model = AutoModelForCausalLM.from_pretrained(models.get(reply_model))
        prev_model = reply_model

    reply_id = user_model.generate(bot_input_ids, max_length=256, pad_token_id=tokenizer.eos_token_id,
                                   no_repeat_ngram_size=3, do_sample=True, top_k=100, top_p=0.7, temperature=0.8)

    return tokenizer.decode(reply_id[:, bot_input_ids.shape[-1]:][0], skip_special_tokens=True)


def split_reply(reply):
    k = 0
    replies = []
    for i in range(len(reply)):
        if reply[i] == '#':
            replies.append(reply[k:i])
            # change to +2 for deleting heading space?
            k = i + 2
    if len(replies) == 0:
        replies.append(reply)
    return replies
