import os.path

from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import chatty

app = Flask(__name__)
CORS(app, resources={"/*": {"origins": "*"}})

models = chatty.collect_models('models')
model_indices = {}
for mod in models:
    if os.path.isfile("data/chats-{}.csv".format(mod)):
        with open("data/chats-{}.csv".format(mod), 'r') as fp:
            for count, line in enumerate(fp):
                pass
            model_indices[mod] = count
            fp.close()
    else:
        model_indices[mod] = 0


# converting the incoming message array to tokens
def convert_to_tokens(chat_messages):
    chat_ids = []
    for message in chat_messages:
        chat_ids.append(chatty.tokenize_input(message))
    return chat_ids


@app.route('/<bot>', methods=['POST'])
@cross_origin()
def request_handler(bot):
    try:
        if request.method == 'POST':
            if bot not in models:
                return jsonify({'error': 'MODEL_NOT_FOUND'}), 400

            content = request.get_json()

            chat_ids = convert_to_tokens(content['messages'])
            bot_input_ids = chatty.cat_tensors(chat_ids)

            if chatty.len_tensors(bot_input_ids) > 256:
                # reply = "Sorry, this is too much for me to handle right now. Could you please summarize this a bit?"
                reply = "CONTENT_TOO_LONG"
                return {'error': reply}, 400

            replies = chatty.split_reply(chatty.get_reply(bot_input_ids, bot))
            return jsonify({'messages': replies}), 200
    except:
        return """<img src="https://qph.fs.quoracdn.net/main-qimg-863379f19d3db784b48f4dd78d014c19"
            alt="not available">""", 500


@app.route('/feedback', methods=['POST'])
@cross_origin()
def feedback_handler():
    global model_indices
    content = request.get_json()

    index = model_indices.get(content['model'])

    if content['feedback']:
        with open("data/chats-{}.csv".format(content['model']), 'a') as f:
            if index == 0:
                f.write("index,time,from,line\n")
            for msg in content['messages']:
                f.write("{},{},{},{}\n".format(index, msg['timestamp'], msg['origin'], msg['message']))
                index += 1
            f.close()
    model_indices[content['model']] = index
    return "success", 201


if __name__ == '__main__':
    print('Available models are: ', [mod for mod in models])
    app.run()