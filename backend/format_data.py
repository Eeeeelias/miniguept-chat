import csv
import json

convos = open("/home/elias/PycharmProjects/miniguept-chat/backend/data/result.json", 'r')

data = json.loads(convos.read())
#chats = data['chats'][1]


def valid_message(message):
    if len(message['text']) == 0 and 'sticker_emoji' in message:
        return 'emoji'
    if type(message['text']) != list and len(message['text']) > 1:
        return 'normal_text'


def optional_period(current_message):
    if current_message[-1] == "." or current_message[-1] == "?" or current_message[-1] == "!":
        return " # "
    else:
        return " # "


texts = [['index', 'time', 'from', 'line']]
index = 0
prev = ""
curr_text = ""
for person in data['chats']['list']:
    if person['type'] != 'saved_messages' and person['type'] != 'private_group':
        for message in person['messages']:
            if message['type'] == 'message':
                if message['from'] is None:
                    message['from'] = 'deleted'
                if prev == "":
                    prev = message['from']
                if message['from'] == prev:
                    if valid_message(message) == 'emoji':
                        curr_text += message['sticker_emoji'] + optional_period(message['sticker_emoji'])
                    elif valid_message(message) == 'normal_text':
                        curr_text += message['text'] + optional_period(message['text'])
                else:
                    if len(curr_text) > 0:
                        texts.append([index, message['date'], prev, curr_text[:-2]])
                        curr_text = ""
                    else:
                        prev = ""
                    if valid_message(message) == 'emoji':
                        prev = message['from']
                        curr_text = message['sticker_emoji'] + optional_period(message['sticker_emoji'])
                    elif valid_message(message) == 'normal_text':
                        prev = message['from']
                        curr_text = message['text'] + optional_period(message['text'])
                index += 1

output = open('data/telegram_convos.csv', 'w')
writer = csv.writer(output)

writer.writerows(texts)
