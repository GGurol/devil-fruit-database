#!/bin/bash

# Start PostgreSQL
service postgresql start

# Wait for PostgreSQL to be ready
until pg_isready; do
  echo "Waiting for PostgreSQL to be ready..."
  sleep 2
done

# Initialize database
python -m app.core.db_management force-reset --env prod
