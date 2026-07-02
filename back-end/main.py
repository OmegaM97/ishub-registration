from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from applications import router as applications_router
from auth import router as auth_router
from db import init_db

app = FastAPI(title="ishub-registration API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(applications_router)


@app.on_event("startup")
def on_startup():
    init_db()