from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from typing import Union

from app.core.config import settings

app = FastAPI(title=settings.PROJECT_NAME)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=settings.IS_ALLOWED_CREDENTIALS,
    allow_methods=settings.ALLOWED_METHODS,
    allow_headers=settings.ALLOWED_HEADERS,
)

@app.get('/')
def read_root():
  return {'message': 'Hello, World'}

@app.get('/info')
def read_info():
  return {
    'title': settings.PROJECT_NAME
  }

@app.get('/items/{item_id}')
def read_item(item_id: int, q: Union[str, None] = None):
  return {'item_id': item_id, 'q': q}