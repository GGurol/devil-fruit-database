FROM python:3.10

WORKDIR /app/

COPY ./requirements.txt /app/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

# create data dir
RUN mkdir -p /app/data

# copy application code
COPY ./app /app

# copy data files to data dir
COPY ./simple_data.json /app/data/simple_data.json

# copy docker-compose.yml to the image
COPY ./docker-compose.yml /app/docker-compose.yml

CMD ["fastapi", "run", "./main.py", "--port", "8080"]