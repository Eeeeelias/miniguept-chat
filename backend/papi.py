from flask import Flask, jsonify, request
import chatty

app = Flask(__name__)
chatty.set_model('output-big-elias')

model = {"elias": "output-big-elias",
         "rick": "output-trash-rick"}

def convert_to_tokens(chat_messages):
    chat_ids = []
    for message in chat_messages.keys():
        chat_ids.append(chatty.tokenize_input(chat_messages.get(message)))
    return chat_ids[::-1]


@app.route('/', methods=['POST'])
def postJsonHandler():
    content = request.get_json()
    chat_ids = convert_to_tokens(content['messages'])
    bot_input_ids = chatty.cat_tensors(chat_ids)
    reply = chatty.get_reply(bot_input_ids)
    return jsonify({'bot_reply': reply}), 201


@app.route('/<bot>', methods=['GET'])
def change_model(bot):
    chatty.set_model(model.get(bot))
    return "success"


if __name__ == '__main__':
    app.run(host='0.0.0.0')
