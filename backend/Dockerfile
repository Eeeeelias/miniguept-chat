# syntax=docker/dockerfile:1

FROM python:3.10-slim-buster

WORKDIR /python-docker

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY . .

# Production server, use normally
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:7722", "papi:app"]
# Development server, port is 5000 (default). Use if you encounter issues
# CMD ["python3", "papi.py"]