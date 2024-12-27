#!/bin/bash

# Set python environment variables
export PYTHONPATH=../

# Set PostgreSQL environment variables
export PGDATA=/var/lib/postgresql/data
export PATH=$PATH:/usr/lib/postgresql/14/bin

# Function to check PostgreSQL connection
check_postgres() {
    MAX_RETRIES=10
    RETRIES=0

    until pg_isready -U postgres; do
        RETRIES=$((RETRIES + 1))
        if [ $RETRIES -eq $MAX_RETRIES ]; then
            echo "ERROR: PostgreSQL failed to start after $MAX_RETRIES attempts"
            exit 1
        fi
        echo "Waiting for PostgreSQL... Attempt $RETRIES of $MAX_RETRIES"
        sleep 2
    done
    echo "SUCCESS: PostgreSQL connection verified"
}

# Function to handle database operations
handle_operation() {
    local operation=$1
    local environment=$2

    case $operation in
        force-reset|backup|drop)
            check_postgres
            echo "Current directory: $(pwd)"
            python -m app.core.db_management $operation --env $environment
            if [ $? -ne 0 ]; then
                echo "ERROR: Database operation failed"
                exit 1
            fi
            ;;
        *)
            echo "ERROR: Invalid operation: $operation"
            echo "Valid operations: force-reset, backup, drop"
            exit 1
            ;;
    esac
}

# Main execution
if [ "$#" -ne 2 ]; then
    echo "Usage: $0 <operation> <environment>"
    exit 1
fi

handle_operation "$1" "$2"