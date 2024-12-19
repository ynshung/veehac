from jinja2 import TemplateNotFound
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Allow all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

command = [
    "Increase font size",
    "Decrease font size",
    "Increase container size",
    "Decrease container size",
    "Increase brightness",
    "Decrease brightness",
    "Navigate to home page",
    "Navigate to about page",
]


class Message(BaseModel):
    message: str


@app.get("/")
async def read_root():
    return {"message": "Welcome to the FastAPI app!"}


@app.post("/send-message")
async def send_message(message: Message):
    print("AAA")


@app.post("/do-stuff")
async def send_message(message: Message):
    print("AAAddd")
