# miniguept-chat
Chatbot trained on Eeeeelias' chat data.

# Build in docker

Just execute the docker-compose.yml file and you're good to go!
(Make sure you have the models locally on your computer)

```yaml
version: "3.8"

# $ docker compose up -d

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
docker exec -it chatty_backend bash
```
and when you're in the container you can execute chatty_cli.py:
```bash
python chatty_cli.py [-n <your_name>] [-m <elias-bgi|elias|rick>] [-c <context>] [-k <color>]
```
