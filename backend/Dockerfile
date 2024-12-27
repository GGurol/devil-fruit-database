FROM python:3.10 as base

# Copy application code
WORKDIR /app/
COPY ./requirements.txt /app/requirements.txt

# Install dependencies
RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

# copy application code
COPY ./app /app

# copy data files to data dir
COPY ./simple_data.json /app/data/simple_data.json

# Development stage
FROM base as dev

CMD ["fastapi", "run", "./main.py", "--port", "8000"]

# Production stage
FROM base as prod

# Install PostgreSQL
RUN apt-get update && apt-get install -y postgresql postgresql-contrib

# Create data directory
RUN mkdir -p /var/lib/postgresql/data && chown -R postgres:postgres /var/lib/postgresql/data

# db_init script
COPY db_init.sh /app/db_init.sh
RUN chmod +x /app/db_init.sh

CMD ["fastapi", "run", "./main.py", "--port", "8000"]