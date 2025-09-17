# One Piece: Devil Fruit Database

A comprehensive database application for tracking Devil Fruits from the One Piece universe. This project features a modern web interface for browsing and searching Devil Fruits, their users, and abilities.

## Tech Stack

### Backend
- **Framework**: FastAPI
- **Database**: SQLite with SQLModel ORM
- **Other**: Docker

### Frontend
- **Framework**: React.js with TypeScript
- **Build Tool**: Vite
- **Package Manager**: Bun
- **Styling**: styled-components
- **Other**: React Query

## Local Development

### Prerequisites
- Docker and Docker Compose

### Setup

1. Clone the repository to your local machine:
```bash
https://github.com/GGurol/devil-fruit-database.git
```

2. Navigate to the project directory:
```bash
cd devil-fruit-database
```

3. Create and populate database:
```bash
docker compose exec api python -m core.db_management force-reset
```

The backend API will be available at: http://localhost:8000

The frontend will be available at: http://localhost:5173/devil-fruit-database/


## Features
- Comprehensive Devil Fruit database
- Search and filter functionality
- Spoiler protection system
- Responsive design
- RESTful API

## Project Structure

```
devil-fruit-app-v1/
├── backend/              # FastAPI backend
│   ├── app/              # Application code
│   ├── Dockerfile        # Container configuration
│   └── docker-compose.*  # Environment configurations
├── frontend/             # React frontend
│   ├── src/              # Source code
│   └── public/           # Static assets
└── README.md             # Project documentation
```

## API Documentation
When running locally, API documentation is available at:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc



# Database
SQLITE_DB_PATH=data/db/devil_fruits.db


## License
This project is licensed under the MIT License - see the LICENSE file for details.