import csv
import json

convos = open("/home/elias/PycharmProjects/python_image_ai/dataset/chatty_data/result.json", 'r')

data = json.loads(convos.read())
#chats = data['chats'][1]

texts = [['index', 'time', 'from', 'line']]
index = 0
for person in data['chats']['list']:
    if person['type'] != 'saved_messages' and person['type'] != 'private_group':
        for message in person['messages']:
            if message['type'] == 'message' and len(message['text']) > 1:
                if message['from'] is None:
                    message['from'] = 'deleted'
                if type(message['text']) != list:
                    #if len(message['text']) < 3:
                    #    message['text'] = message['text'][1]
                    #    texts.append([index, message['date'], message['from'], message['text']['text']])
                    texts.append([index, message['date'], message['from'], message['text']])
                index += 1

output = open('data/telegram_convos.csv', 'w')
writer = csv.writer(output)

writer.writerows(texts)
