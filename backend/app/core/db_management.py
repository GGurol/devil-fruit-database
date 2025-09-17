import typer
from typing import Optional
from sqlmodel import Session, select, SQLModel

from core.constants import DATA_FILES, Environment
from core.db import init_db, drop_db, populate_db, engine
from models import DevilFruit

app = typer.Typer()

class DatabaseManager:
    @staticmethod
    def is_empty() -> bool:
        """Check if the database is empty"""
        with Session(engine) as session:
            try:
                result = session.exec(select(DevilFruit).limit(1)).first()
                return result is None
            except Exception:
                return True

    @staticmethod
    def require_production_confirmation(env: Environment) -> None:
        """Require confirmation for production operations"""
        if env.is_prod:
            typer.confirm(
                "⚠️  WARNING: You are about to modify the PRODUCTION database. Are you sure?",
                abort=True,
            )

    @staticmethod
    def require_data_drop_confirmation() -> None:
        """Require confirmation when dropping exisiting data"""
        typer.confirm(
            "⚠️  WARNING: You are about to drop a database containing data. Are you sure?",
            abort=True,
        )

    @staticmethod
    def get_data_file(env: Environment, data_file: Optional[str] = None) -> str:
        """Get the appropiate data file path"""
        file_path = data_file or DATA_FILES.get(env)
        if not file_path:
            raise ValueError(f"No data file specified for {env} environment.")
        return file_path

    @classmethod
    def initialize(
        cls,
        env: Environment,
        populate: bool = False,
        force: bool = False,
        upload: bool = False,
        data_file: Optional[str] = None,
    ) -> None:
        """Initialize the database and optionally populate it with data"""
        cls.require_production_confirmation(env)

        if not force and not cls.is_empty():
            raise typer.BadParameter(
                "Database already contains data. Use --force to override."
            )
        elif force and not cls.is_empty():
            cls.require_data_drop_confirmation()
            cls.drop(env)

        if populate:
            try:
                file_path = cls.get_data_file(env, data_file)
                populate_db(file_path, upload)
            except Exception as e:
                raise typer.BadParameter(f"Error populating database: {e}")
        else:
            init_db()
 

    @classmethod
    def backup(cls) -> None:
        """Backup the database"""
        typer.echo("Backup functionality not yet implemented")

    @classmethod
    def drop(cls, env: Environment) -> None:
        """Drop the database"""
        cls.require_production_confirmation(env)
        cls.backup()
        drop_db()

    @classmethod
    def reset(cls, env: Environment) -> None:
        """Reset the database"""
        cls.require_production_confirmation(env)
        cls.backup()
        drop_db()
        init_db()

    @classmethod
    def force_reset(cls, env: Environment, upload: bool = False, data_file: Optional[str] = None):
        """Force reset and populate the database without any confirmations"""
        if env.is_prod:
            typer.echo(
                "⚠️  WARNING: Using force-reset in production is not recommended!",
                err=True,
            )

        # 1. Drop the old database file
        drop_db()

        # 2. CORRECTED: Explicitly create all tables HERE, where we know models are imported
        print("Initializing database and creating tables...")
        SQLModel.metadata.create_all(engine)
        print("Tables created successfully.")
        
        # 3. Now populate the newly created tables
        file_path = cls.get_data_file(env, data_file)
        populate_db(file_path, upload)


# CLI commands
@app.command()
def init(
    env: Environment = Environment.DEV,
    populate: bool = False,
    force: bool = False,
    upload: bool = False,
    data_file: Optional[str] = None,
):
    """Initialize the database and optionally populate it with data"""
    try:
        DatabaseManager.initialize(env, populate, force, upload, data_file)
        typer.echo(f"Database initialized for {env} environment.")
    except Exception as e:
        typer.echo(f"Error during initialization: {e}", err=True)
        raise typer.Exit(1)


@app.command()
def backup(env: Environment = Environment.DEV):
    """Backup the database"""
    try:
        DatabaseManager.backup()
        typer.echo(f"Database backed up for {env} environment.")
    except Exception as e:
        typer.echo(f"Error during backup: {e}", err=True)
        raise typer.Exit(1)


@app.command()
def reset(env: Environment = Environment.DEV):
    """Reset the database, this is a destructive operation"""
    try:
        DatabaseManager.reset(env)
        typer.echo(f"Database reset for {env} environment.")
    except Exception as e:
        typer.echo(f"Error during reset: {e}", err=True)
        raise typer.Exit(1)


@app.command()
def force_reset(env: Environment = Environment.DEV, upload: bool = False, data_file: Optional[str] = None):
    """Force reset and populate the database without any confirmations"""
    try:
        DatabaseManager.force_reset(env, upload, data_file)
        typer.echo(f"Database force reset and populated for {env} environment.")
    except Exception as e:
        typer.echo(f"Error during forced reset: {e}", err=True)
        raise typer.Exit(1)


@app.command()
def drop(env: Environment = Environment.DEV):
    """Drop that database, this is a destructive operation"""
    try:
        DatabaseManager.drop(env)
        typer.echo(f"Database dropped for {env} environment.")
    except Exception as e:
        typer.echo(f"Error during drop: {e}", err=True)
        raise typer.Exit(1)


if __name__ == "__main__":
    app()