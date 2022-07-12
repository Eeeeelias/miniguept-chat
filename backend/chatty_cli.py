#!/usr/bin/env python3
import argparse
import os
import time

import torch
from termcolor import colored

parser = argparse.ArgumentParser()

parser.add_argument("-n", dest='name', help='The name of the person chatting with the bot')
parser.add_argument('-m', dest='model', help='Choose the model that you want to chat with. Available options are: '
                                             'elias-sm, rick')
parser.add_argument('-c', dest='context', help='The amount of context you want to keep. Keep in mind that the total'
                                               'of the input tensor must not exceed 256')
parser.add_argument('-k', dest='color', help="If for some reason the default color (cyan) of the bot-text doesn't work "
                                             "for you, you can change it here. Allowed are: grey, red, green, yellow, "
                                             "blue, magenta, cyan, white")
args = parser.parse_args()

# setting some default variables
models = {'elias-sm': 'output-medium-elias',
          'elias-bg': 'output-big-elias',
          'elias-bgi': 'output-big-elias-improved',
          'rick': 'output-trash-rick'}

allowed_colors = ['grey', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white']
context_ids = None
context = 4
reset_step = False
name = 'User'
color = 'cyan'
chat_model = 'elias-bg'

clear = lambda: os.system('cls' if os.name == 'nt' else 'clear')

if __name__ == '__main__':
    try:
        if args.name:
            name = args.name
        if args.context:
            context = args.context
        if args.color:
            if args.color in allowed_colors:
                color = args.color
            else:
                print(colored('INFO: Color not allowed! Using default...', 'red'))
        if args.model:
            if args.model in models:
                chat_model = args.model
            else:
                print(colored('INFO: Model not found! Using {}'.format(chat_model), 'red'))

        # speeding up the first arguments and such
        import chatty

        chatty.set_model(models.get(chat_model))

        print(colored("INFO:\nUse :q to exit the chat,\n:reset to make MiniguePT forget about the previous "
                      "conversation and\n:c to clear the current text", 'red'))

        while True:
            if reset_step:
                reset_step = False

            user_text = input("{}: ".format(name))
            if user_text == ":q":
                exit()
            if user_text == ":reset":
                context_ids = None
                reset_step = True
                user_text = input("{}: ".format(name))
            if user_text == ":c":
                clear()
                user_text = input("{}: ".format(name))

            bot_input_id = chatty.add_context(chatty.tokenize_input(user_text), context_ids, context, reset_step)

            if chatty.len_tensors(bot_input_id) > 256:
                print(colored("MiniguePT: {}".format("Sorry, this is too much for me to handle right now. Could you"
                                                     " please summarize this a bit?"), color))
            else:
                replies = chatty.get_reply(bot_input_id)
                context_ids = torch.cat([bot_input_id, chatty.tokenize_input(replies)], dim=-1)
                for reply in chatty.split_reply(replies):
                    print(colored("MiniguePT: {}".format(reply), color))
                    time.sleep(0.5)
    except KeyboardInterrupt:
        print('Stopping...')
        exit(0)
