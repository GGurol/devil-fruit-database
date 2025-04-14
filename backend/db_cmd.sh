#!/bin/bash

# Set python environment variables
export PYTHONPATH=../

# Print execution info
echo "Initializing database in environment: $ENVIRONMENT"

echo "Current directory: $(pwd)"

# Create database directory if it doesn't exist
mkdir -p /app/data/db

# Execute database initialization
python -m app.core.db_management force-reset --env $ENVIRONMENT

# Check execution status
if [ $? -ne 0 ]; then
    echo "ERROR: Database initialization failed"
    exit 1
fi

echo "Database initialization completed successfully!"

