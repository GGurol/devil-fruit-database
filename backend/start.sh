#!/bin/bash

# Set python environment variables
export PYTHONPATH=../

# Set PostgreSQL environment variables
export PGDATA=/var/lib/postgresql/data

# Initialize PostgreSQL data directory if not exists
if [ ! -d "$PGDATA" ]; then
    mkdir -p "$PGDATA"
    chown postgres:postgres "$PGDATA"
    su - postgres -c "initdb -D $PGDATA"
    
    # Configure pg_hba.conf
    echo "host all all all md5" >> "$PGDATA/pg_hba.conf"
    echo "local all all trust" >> "$PGDATA/pg_hba.conf"
fi

# Start PostgreSQL
service postgresql start

# Wait for PostgreSQL to be ready
until pg_isready; do
  echo "Waiting for PostgreSQL..."
  sleep 2
done

# Create initial database and user if they don't exist
su - postgres -c "psql -tc \"SELECT 1 FROM pg_database WHERE datname = '$POSTGRES_DB'\" | grep -q 1 || psql -c \"CREATE DATABASE $POSTGRES_DB\""
su - postgres -c "psql -tc \"SELECT 1 FROM pg_user WHERE usename = '$POSTGRES_USER'\" | grep -q 1 || psql -c \"CREATE USER $POSTGRES_USER WITH PASSWORD '$POSTGRES_PASSWORD'\""
su - postgres -c "psql -c \"GRANT ALL PRIVILEGES ON DATABASE $POSTGRES_DB TO $POSTGRES_USER\""

# Verify PostgreSQL is running
if ! pg_isready; then
    echo "ERROR: PostgreSQL is not running"
    exit 1
fi

# Verify database exists
if ! su - postgres -c "psql -lqt | cut -d \| -f 1 | grep -qw $POSTGRES_DB"; then
    echo "ERROR: Database $POSTGRES_DB does not exist"
    exit 1
fi

# Verify user exists and can connect
if ! su - postgres -c "psql -c '\du' | grep -q $POSTGRES_USER"; then
    echo "ERROR: User $POSTGRES_USER does not exist"
    exit 1
fi

# Test user connection
if ! PGPASSWORD=$POSTGRES_PASSWORD psql -h localhost -U $POSTGRES_USER -d $POSTGRES_DB -c '\l' > /dev/null 2>&1; then
    echo "ERROR: Cannot connect with user $POSTGRES_USER"
    exit 1
fi

# Initialize database
python -m app.core.db_management force-reset --env prod

# Verify tables exist
if ! PGPASSWORD=$POSTGRES_PASSWORD psql -h localhost -U $POSTGRES_USER -d $POSTGRES_DB -c '\dt' | grep -q 'devil_fruit'; then
    echo "ERROR: Tables not created"
    exit 1
fi

echo "Database setup completed successfully!"
echo "Service running on port 8000"

# Initialize database
# python -m app.core.db_management force-reset --env prod
