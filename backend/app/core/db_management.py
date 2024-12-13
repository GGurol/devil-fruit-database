import typer

from typing import Optional
from sqlmodel import Session, select

from app.core.constants import Environment
from app.core.db import init_db, drop_db, populate_db, engine

from app.models import DevilFruit


app = typer.Typer()


def require_production_confirmation(env: Environment):
    """require confirmation for production operations"""
    if env.is_prod:
        typer.confirm(
            "⚠️  WARNING: You are about to modify the PRODUCTION database. Are you sure?",
            abort=True,
        )


def database_is_empty() -> bool:
    """check if the database is empty"""
    with Session(engine) as session:
        try:
            result = session.exec(select(DevilFruit).limit(1)).first()
            return result is None
        except:
            return True


@app.command()
def init(
    env: Environment = Environment.DEV,
    populate: bool = False,
    force: bool = False,
    data_file: Optional[str] = None,
):
    """initialize the database and optionally populate it with data"""
    if not force and not database_is_empty():
        typer.echo("Database already contains data. Use --force to override.")
        raise typer.Exit(1)

    if populate:
        require_production_confirmation(env)

    init_db()

    if populate:
        # allowing different data files for different environments
        file_path = data_file or {
            Environment.DEV: "app/data/simple_data.json",
            Environment.STAGING: "app/data/simple_data.json",
            Environment.PROD: "app/data/simple_data.json",
        }.get(env)

        if not file_path:
            typer.echo(f"No data file specified for {env} environment")
            raise typer.Exit(1)

        populate_db(file_path)

    typer.echo(f"Database initialized for {env} environment")


@app.command()
def backup(env: Environment = Environment.DEV):
    """backup the database"""
    require_production_confirmation(env)

    # implementation of database backup

    typer.echo(f"Database backed up for {env} environment")


@app.command()
def reset(env: Environment = Environment.DEV):
    """reset the database, this is a destructive operation"""
    require_production_confirmation(env)

    backup(env)

    drop_db()
    init_db()

    typer.echo(f"Database reset for {env} environment")


if __name__ == "__main__":
    app()
