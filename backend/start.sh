#!/bin/bash

# Set Python path to root directory
export PYTHONPATH=../

# Initialize PostgreSQL data directory
su - postgres -c "initdb -D /var/lib/postgresql/data"

# Start PostgreSQL
service postgresql start

# Create database and set password
su - postgres -c "psql -c \"CREATE DATABASE $POSTGRES_DB;\""
su - postgres -c "psql -c \"CREATE USER $POSTGRES_USER WITH PASSWORD '$POSTGRES_PASSWORD';\""
su - postgres -c "psql -c \"GRANT ALL PRIVILEGES ON DATABASE $POSTGRES_DB TO $POSTGRES_USER;\""

# Update authentication method in pg_hba.conf
echo "host all all all md5" >> /var/lib/postgresql/data/pg_hba.conf

# Restart PostgreSQL to apply changes
service postgresql restart

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
