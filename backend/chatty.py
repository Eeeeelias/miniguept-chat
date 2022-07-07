from transformers import AutoModelForCausalLM, AutoTokenizer
import torch
import argparse

parser = argparse.ArgumentParser()

parser.add_argument("-n", dest='name', help='The name of the person chatting with the bot')
parser.add_argument('-m', dest='model', help='Choose the model that you want to chat with. Available options are: '
                                             'elias-sm, rick')
parser.add_argument('-c', dest='context', help='The amount of context you want to keep. Keep in mind that the total'
                                               'of the input tensor must not exceed 256')
args = parser.parse_args()

models = {'elias-sm':'output-medium-elias',
          'rick':'output-trash-rick'}

tokenizer = AutoTokenizer.from_pretrained("microsoft/DialoGPT-medium")
model = AutoModelForCausalLM.from_pretrained(models.get(args.model))

first = True
token_length = []
eos_token = 50256
step = 1

while True:
    userinput = input("{}: ".format(args.name))
    # check user inputs like exit, restart, send images, etc.
    if userinput == "!exit":
        exit()
    if userinput == "!reset":
        chat_history_ids = 0
        first = True
        step = 1
        continue

    input_ids = tokenizer.encode(userinput + tokenizer.eos_token, return_tensors='pt')

    # the oldest (given context) input gets removed from the tensor to keep the max_length under 256
    if step >= int(args.context):
        index = 0
        # gives tensor(<value>)
        for t in chat_history_ids[0]:
            # t can be compared to an int
            if t == eos_token:
                break
            index += 1
        chat_history_ids = chat_history_ids[:, index + 1:]

    if not first:
        bot_input_ids = torch.cat([chat_history_ids, input_ids], dim=-1)
    else:
        bot_input_ids = input_ids
        first = False

    # max_length -> maximum message limit is needed.
    chat_history_ids = model.generate(bot_input_ids, max_length=256, pad_token_id=tokenizer.eos_token_id,
                                      no_repeat_ngram_size=3, do_sample=True, top_k=100, top_p=0.7, temperature=0.8)

    print("MiniguePT: {}".format(tokenizer.decode(chat_history_ids[:, bot_input_ids.shape[-1]:][0],
                                                  skip_special_tokens=True)))

    step += 1


    #bild input auf waifu classifier zugreifen lassen
    # flask framework