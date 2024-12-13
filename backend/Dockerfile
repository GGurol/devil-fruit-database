FROM python:3.10

WORKDIR /app/

COPY ./requirements.txt /app/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

# create data dir
RUN mkdir -p /app/app/data

# copt application code
COPY ./app /app/app

# copy data files to data dir
COPY ./simple_data.json /app/app/data/simple_data.json

ENV PYTHONPATH=/app

CMD ["fastapi", "run", "./app/main.py", "--port", "8000"]
# CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]