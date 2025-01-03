#!/bin/bash

# Set python environment variables
export PYTHONPATH=../

# Print execution info
echo "Initializing database in environment: $ENVIRONMENT"
echo "Connection: $GCP_SQL_INSTANCE_CONNECTION_NAME"
echo "Database: $POSTGRES_DB"
echo "User: $POSTGRES_USER"
echo "Password: $POSTGRES_PASSWORD"

echo "Current directory: $(pwd)"

# Execute database initialization
python -m app.core.db_management force-reset --env $ENVIRONMENT

# Check execution status
if [ $? -ne 0 ]; then
    echo "ERROR: Database initialization failed"
    exit 1
fi

echo "Database initialization completed successfully!"

