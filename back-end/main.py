from fastapi import FastAPI

from auth import router as auth_router
from db import init_db

app = FastAPI(title="ishub-registration API")

app.include_router(auth_router)


@app.on_event("startup")
def on_startup():
    init_db()