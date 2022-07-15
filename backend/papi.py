import flask
from flask import Flask, jsonify, request
import chatty

app = Flask(__name__)
chatty.set_model('output-big-elias')

models = ["elias", "rick", "elias-bgi"]


# change input to array
def convert_to_tokens(chat_messages):
    chat_ids = []
    for message in chat_messages[::-1]:
        chat_ids.append(chatty.tokenize_input(message))
    return chat_ids


@app.route('/<bot>', methods=['POST'])
def request_handler(bot):
    # don't forget try except
    if request.method == 'POST':
        if bot not in models:
            return """<img src="https://qph.fs.quoracdn.net/main-qimg-863379f19d3db784b48f4dd78d014c19" 
            alt="not available">""", 500

        content = request.get_json()

        chat_ids = convert_to_tokens(content['messages'])
        bot_input_ids = chatty.cat_tensors(chat_ids)

        if chatty.len_tensors(bot_input_ids) > 256:
            # reply = "Sorry, this is too much for me to handle right now. Could you please summarize this a bit?"
            reply = "CONTENT_TOO_LONG"
            return {'error': reply}, 400

        replies = chatty.split_reply(chatty.get_reply(bot_input_ids, bot))
        return jsonify({'messages': replies}), 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=7722)
