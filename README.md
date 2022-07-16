# miniguept-chat
Chatbot trained on Eeeeelias' chat data.

# Build in docker

First, go to backend/ and build the Dockerfile using: 

````bash
docker build -t chatty_backend .
````
After that's done, you can use the docker-compose.yml and put in the paths of the model folders

```yaml
version: '3.3'
services:
  chatty_backend:
    ports:
      - '7722:7722'
    volumes:
      - '/<your>/<path>/<here>/output-big-elias:/python-docker/output-big-elias'
      - '/<your>/<path>/<here>/output-trash-rick:/python-docker/output-trash-rick'
      - '/<your>/<path>/<here>/output-big-elias-improved:/python-docker/output-big-elias-improved'
    container_name: chatty
    image: chatty_backend
```

If you then want to try the chatbot for yourself in terminal, you can do that! Just type in
```bash
docker exec -it chatty bash
```
and when you're in the container you can execute chatty_cli.py:
```bash
python chatty_cli.py -n <your_name> -m <elias-bgi|elias-bg|rick>
```
