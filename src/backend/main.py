from jinja2 import TemplateNotFound
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer
nltk.download('vader_lexicon')
app = FastAPI()

# Allow all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Message(BaseModel):
    message: str


@app.get("/")
async def read_root():
    return {"message": "Welcome to the FastAPI app!"}


@app.post("/judge-description")
async def send_message(message: Message):
    analyser = SentimentIntensityAnalyzer()
    scores = analyser.polarity_scores(Message.message)
    print(scores)
