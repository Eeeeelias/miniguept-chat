from flask import Flask, jsonify, request
import chatty

app = Flask(__name__)
chatty.set_model('output-big-elias')

model = {"elias": "output-big-elias",
         "rick": "output-trash-rick",
         "elias-bgi": "output-big-elias-improved"}


# change input to array
def convert_to_tokens(chat_messages):
    chat_ids = []
    for message in chat_messages[::-1]:
        chat_ids.append(chatty.tokenize_input(message))
    return chat_ids


@app.route('/<bot>', methods=['GET', 'POST'])
def request_handler(bot):
    if request.method == 'GET':
        try:
            chatty.set_model(model.get(bot))
            return "", 204
        except:
            return "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.redd.it%2Fb8dnk9lu33631.jpg&f=1" \
                   "&nofb=1", 500

    elif request.method == 'POST':
        # Check for model version
        content = request.get_json()
        chat_ids = convert_to_tokens(content['messages'])
        bot_input_ids = chatty.cat_tensors(chat_ids)

        if chatty.len_tensors(bot_input_ids) > 256:
            # reply = "Sorry, this is too much for me to handle right now. Could you please summarize this a bit?"
            reply = "CONTENT_TOO_LONG"
            return {'error': reply}, 400

        replies = chatty.split_reply(chatty.get_reply(bot_input_ids))
        return jsonify({'messages': replies}), 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=7722)
