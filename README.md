# miniguept-chat
Chatbot trained on Eeeeelias' chat data.

# Formatting chat data

If you want to format your own chat such that it can be read by the neural network 
you can use backend/format_data.py. Currently, you can format WhatsApp or Telegram exported
chat data. To use just execute:
```bash
$ python3 backend/format_data.py -i <chats> -t <telegram|whatsapp> [-a]
```
Your `input` can be either a single file or a folder with .txt files (for your exported
WhatsApp chats). If you use the `-a` option, it will append your input to an existing output file.
With this .csv file you can then move on to train your own chatbot.

# Training a chatbot

For training your chatbot you need to modify the backend/args.py file to suit 
your needs. There is only one param that you *have* to change, namely `your_name`. `your_name` should be the name that is in your dataset for the messages that 
you sent (make sure it's the same all the time).
```bash
$ vim backend/args.py
```

When that is set you need to make sure that you have all the dependencies installed.
You can easily do that by using the `requirements.txt`.
```bash
$ pip install -r requirements.txt
```
When that is done you just need to run the `modules.py` file. Depending on your hardware and
dataset this *will* take a while.
```bash
$ python3 ./backend/modules.py
```
After that, your model is saved in `models/my-awesome-chatbot` and you can use it for your chatbot!

# Build in docker

Just execute the docker-compose.yml file and you're good to go!
(Make sure you have the models locally on your computer)

```yaml
version: "3.8"

# $ docker-compose up --build

services:
  client:
    build: ./frontend
    container_name: chatty_frontend
    ports:
      - "8080:80"

  service:
    build: ./backend
    container_name: chatty_backend
    ports:
      - '7722:7722'
    volumes:
      - './backend/models:/python-docker/models'
```

If you want to try the chatbot for yourself in terminal, you can do that! Just type in
```bash
$ docker exec -it chatty_backend bash
```
and when you're in the container you can execute chatty_cli.py:
```bash
$ python chatty_cli.py [-n <your_name>] [-m <elias-bgi|elias|rick>] [-c <context>] [-k <color>]
```
