import os
import re

from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

models = {'minigue': 'models/output-minigue',
          'minigue-bgi': 'models/output-minigue-bgi',
          'rick': 'models/output-rick'}

# Initialize variables
tokenizer = AutoTokenizer.from_pretrained("microsoft/DialoGPT-small")
eos_token = 50256
model = None
step = 1
prev_model = "elias"
user_model = None  # AutoModelForCausalLM.from_pretrained(models.get('minigue'))


def collect_models(path):
    global models
    for pa in os.listdir(path):
        if all(n not in pa for n in ('minigue', 'rick')):
            model_name = re.search("(?<=output-).*", pa.split('/')[-1]).group()
            models[model_name] = path + "/" + pa
    return [key for key in models.keys()]


# changes model
def set_model(model_name):
    global user_model
    user_model = AutoModelForCausalLM.from_pretrained(model_name)


# encodes text to tokens
def tokenize_input(user_input):
    return tokenizer.encode(user_input + tokenizer.eos_token, return_tensors='pt')


# adds context to an input
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


# concatenates a list of tensors
def cat_tensors(tensor_list):
    return torch.cat(tensor_list, dim=-1)


# returns length of tensor
def len_tensors(tensor):
    return tensor.size(dim=-1)


# returns a reply for a given context
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


# splitting replies when split token found
def split_reply(reply):
    k = 0
    replies = []
    for i in range(len(reply)):
        if reply[i] == '#':
            replies.append(reply[k:i])
            k = i + 2
    if len(replies) == 0:
        replies.append(reply)
    return replies


def set_none():
    global user_model
    global prev_model
    prev_model = ""
    user_model = None
