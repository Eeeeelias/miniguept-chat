import os.path

from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import chatty

app = Flask(__name__)
CORS(app, resources={"/*": {"origins": "*"}})

models = chatty.collect_models('models')


# gets the indices for all the models to correctly number lines in future feedback
def get_indices(feedback):
    model_indices = {}
    if not os.path.exists("data/{}".format(feedback)):
        os.mkdir("data/{}".format(feedback))

    for mod in models:
        if os.path.isfile("data/{}/chats-{}.csv".format(feedback, mod)):
            with open("data/{}/chats-{}.csv".format(feedback, mod), 'r') as fp:
                for count, line in enumerate(fp):
                    pass
                model_indices[mod] = count
                fp.close()
        else:
            model_indices[mod] = 0
    return model_indices


# converting the incoming message array to tokens
def convert_to_tokens(chat_messages):
    chat_ids = []
    for message in chat_messages:
        chat_ids.append(chatty.tokenize_input(message))
    return chat_ids


# writes the feedback to the appropriate file
def write_feedback(feedback, content, index):
    with open("data/{}/chats-{}.csv".format(feedback, content['model']), 'a') as f:
        if index == 0:
            f.write("index,time,origin,line\n")
        for msg in content['messages']:
            f.write("{},{},{},{}\n".format(index, msg['timestamp'], msg['origin'], msg['message']))
            index += 1
        f.write("{},{},{},{}\n".format(index, "20XX-XX-XXTXX:XX:XX.XXXZ", "EOC", "N/A"))
        index += 1
        f.close()
    return index


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
    try:
        content = request.get_json()

        model = content['model']
        if content['feedback']:
            model_indices_good = get_indices('good')
            model_indices_good[model] = write_feedback('good', content, model_indices_good.get(model))
        elif not content['feedback']:
            model_indices_bad = get_indices('bad')
            model_indices_bad[model] = write_feedback('bad', content, model_indices_bad.get(model))

        return "", 201

    except:
        return """<img src="https://qph.fs.quoracdn.net/main-qimg-863379f19d3db784b48f4dd78d014c19"
            alt="not available">""", 500


if __name__ == '__main__':
    print('Available models are: ', [mod for mod in models])
    app.run(debug=True)
