#!/bin/bash

# Set Python path to root directory
export PYTHONPATH=../

# Start PostgreSQL
service postgresql start

# Wait for PostgreSQL to be ready
until pg_isready; do
  echo "Waiting for PostgreSQL to be ready..."
  sleep 2
done

pwd
ls -la 

# Make script executable
# chmod +x /app/app/core/db_management.py

# Run script directly
# ./app/core/db_management.py force-reset --env prod

# Initialize database
python -m app.core.db_management force-reset --env prod
