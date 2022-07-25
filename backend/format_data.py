import csv
import glob
import json
import argparse
import os
import re

parser = argparse.ArgumentParser()

parser.add_argument("-i", dest='input', help='the input file')
parser.add_argument("-t", dest='type', help='the type of chat you want to format. supported are: telegram')
parser.add_argument("-a", dest='append', action='store_true', help='append to the existing convos.csv file')

text_header = [['index', 'time', 'origin', 'line']]
index = 0


def valid_message(message):
    if len(message['text']) == 0 and 'sticker_emoji' in message:
        return 'emoji'
    if type(message['text']) != list and len(message['text']) > 1:
        return 'normal_text'


def message_concat():
    return " # "


def telegram_chats(data, i, single=True):
    texts = []
    single_person_chat = {}
    # if there is just one single file for all chats, go over each person like this
    if single:
        for person in data['chats']['list']:
            if person['type'] != 'saved_messages' and person['type'] != 'private_group':
                for key in person.keys():
                    single_person_chat[key] = person.get(key)
                texts += read_single_chat(single_person_chat, i)
    else:
        texts = read_single_chat(data, i)
    return texts


# reading a single telegram chat
def read_single_chat(chat, i):
    curr_text = ""
    prev = ""
    index = i
    texts = []
    for message in chat['messages']:
        if message['type'] == 'message':
            if message['from'] is None:
                message['from'] = 'deleted'
            if prev == "":
                prev = message['from']
            if message['from'] == prev:
                if valid_message(message) == 'emoji':
                    curr_text += message['sticker_emoji'] + message_concat()
                elif valid_message(message) == 'normal_text':
                    curr_text += message['text'] + message_concat()
            else:
                if len(curr_text) > 0:
                    texts.append([index, message['date'], prev, curr_text[:-2]])
                    curr_text = ""
                else:
                    prev = ""
                if valid_message(message) == 'emoji':
                    prev = message['from']
                    curr_text = message['sticker_emoji'] + message_concat()
                elif valid_message(message) == 'normal_text':
                    prev = message['from']
                    curr_text = message['text'] + message_concat()
            index += 1
    return texts


def whatsapp_chats(chat, i):
    global index
    not_first = False
    cou = i
    lines = []
    for line in chat.readlines():
        matches = re.search('([0-9]+.+[0-9]+) - (.*): (.*)', line)
        if matches:
            if not re.search('<[A-Za-z ]*>', line):
                if not_first and matches.group(2) == lines[cou - i - 1][2]:
                    lines[cou - i - 1][3] = lines[cou - i - 1][3] + message_concat() + matches.group(3)
                else:
                    not_first = True
                    lines.append([cou, matches.group(1).split(',')[0], matches.group(2), matches.group(3)])
                    cou += 1
        elif not re.search('[0-9]+.+[0-9]+', line):
            lines[cou - i - 1][3] = lines[cou - i - 1][3] + line.rstrip()
    index += len(lines)
    return lines


def discord_chats():
    return


# filter for gay comments
def feedback_chats():
    return


def get_negative_examples(chat):
    bad_examples = []
    i = 0
    tmp = []
    for line in chat:
        if line[0] == 'index':
            continue
        tmp.append(line[3])
        i += 1
        if i % 4 == 0:
            bad_examples.append(tmp)
            tmp = []

    return bad_examples


if __name__ == '__main__':
    args = parser.parse_args()

    if not (args.type and args.input):
        parser.error('Please specify the file/directory and/or the data to be parsed')

    if not os.path.exists('data'):
        os.makedirs('data')

    if args.append and os.path.exists('data/formatted_convos.csv'):
        with open('data/formatted_convos.csv', 'r', encoding='utf-8') as fp:
            for count, line in enumerate(fp):
                pass
            index = count
            fp.close()

    chats = []
    # read telegram data
    if args.type == 'telegram':
        if os.path.isdir(args.input):
            for path in glob.glob(args.input + "/*.json"):
                convo = open(path, 'r', encoding='utf-8')
                chats += telegram_chats(json.loads(convo.read()), index, single=False)
        else:
            convos = open(args.input, 'r', encoding='utf-8')
            chats = telegram_chats(json.loads(convos.read()), index)
            convos.close()
    # read whatsapp data
    elif args.type == 'whatsapp':
        if os.path.isdir(args.input):
            for path in glob.glob(args.input + "/*.txt"):
                convo = open(path, 'r', encoding='utf-8')
                chats += whatsapp_chats(convo, index)
                convo.close()
        else:
            convo = open(args.input, 'r', encoding='utf-8')
            chats = whatsapp_chats(convo, index)
            convo.close()

    # read feedback data
    elif args.type == 'user':
        # getting the bad examples so to avoid accidental positive feedback
        bad_examples = []
        for path in glob.glob('{}/bad/*.csv'.format(args.input)):
            convo = csv.reader(open(path, 'r', encoding='utf-8'))
            bads = get_negative_examples(convo)
            [bad_examples.append(ex) for ex in bads]

        for path in glob.glob('{}/good/*.csv'.format(args.input)):
            convo = csv.reader(open(path, 'r', encoding='utf-8'))
            # append to chats[] and check if it's also in bad_examples, remove if so
            # write to normal dataset, ready for training




    else:
        print('Not implemented yet. Either use \'telegram\' or \'whatsapp\'!')
        exit(0)

    if args.append:
        texts = chats
        output = open('data/formatted_convos.csv', 'a', encoding='UTF-8', newline='')
    else:
        texts = text_header + chats
        output = open('data/formatted_convos.csv', 'w', encoding='UTF-8', newline='')

    writer = csv.writer(output)
    writer.writerows(texts)
    output.close()
    exit(0)
