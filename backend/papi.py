from flask import Flask, jsonify, request
import chatty

app = Flask(__name__)
chatty.set_model('output-big-elias')

model = {"elias": "output-big-elias",
         "rick": "output-trash-rick",
         "elias-smi":"output-small-elias-improved"}


def convert_to_tokens(chat_messages):
    chat_ids = []
    for message in chat_messages.keys():
        chat_ids.append(chatty.tokenize_input(chat_messages.get(message)))
    return chat_ids[::-1]


def split_reply(reply):
    j = 0
    k = 0
    replies = {}
    for i in range(len(reply[:-1])):
        if reply[i] == '.':
            replies['reply' + str(j)] = reply[k:i]
            k = i + 1
            j += 1
    if len(replies) == 0:
        replies['reply'] = reply
    return replies


@app.route('/<bot>', methods=['GET', 'POST'])
def request_handler(bot):
    if request.method == 'GET':
        chatty.set_model(model.get(bot))
        return 'success', 200
    elif request.method == 'POST':
        content = request.get_json()
        chat_ids = convert_to_tokens(content['messages'])
        bot_input_ids = chatty.cat_tensors(chat_ids)

        if chatty.len_tensors(bot_input_ids) > 256:
            reply = "Sorry, this is too much for me to handle right now. Could you please summarize this a bit?"
            return jsonify({'bot_reply': reply, 'reset': True}), 400

        replies = split_reply(chatty.get_reply(bot_input_ids))
        return jsonify(replies), 201


if __name__ == '__main__':
    app.run(host='0.0.0.0')
