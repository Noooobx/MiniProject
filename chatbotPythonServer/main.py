from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import os
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
from plyer import notification
import google.generativeai as genai
from textblob import TextBlob  # Sentiment analysis

# Load environment variables
load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("GEMINI_API_KEY is missing. Set it in the .env file.")

genai.configure(api_key=api_key)

app = FastAPI()

# Enable CORS for frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Reminder(BaseModel):
    medicine: str
    time: str

class MedicineRequest(BaseModel):
    medicine: str

reminders = []

@app.get("/reminders")
def get_reminders():
    return {"reminders": reminders}

@app.post("/reminders")
def add_reminder(reminder: Reminder):
    reminders.append(reminder.dict())
    return {"reminders": reminders}

@app.delete("/reminders/{medicine}")
def delete_reminder(medicine: str):
    global reminders
    reminders = [r for r in reminders if r["medicine"] != medicine]
    return {"reminders": reminders}

@app.post("/send_notification")
def send_notification(request: MedicineRequest):
    try:
        medicine = request.medicine
        print(f"Sending Notification for {medicine}")

        notification.notify(
            title="Medicine Reminder",
            message=f"\u26a0\ufe0f Reminder: It's time to take your {medicine}.",
            timeout=10
        )

        return {"message": "Notification sent successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

class PromptRequest(BaseModel):
    prompt: str

# Global chat history (for a single user)
chat_history = [
    {"role": "user", "parts": [{"text": "My name is Nandakishor"}]},
    {"role": "model", "parts": [{"text": "Nice to meet you, Nandakishor!"}]}
]

@app.post("/generate")
async def generate_text(request: PromptRequest):
    try:
        user_input = request.prompt

        # Perform sentiment analysis
        sentiment = TextBlob(user_input).sentiment.polarity  # Ranges from -1 (negative) to +1 (positive)

        # Modify response based on sentiment
        if sentiment < -0.3:
            sentiment_response = "I sense that you're feeling down. I'm here to help. What's bothering you?"
            chat_history.append({"role": "model", "parts": [{"text": sentiment_response}]})
            return {"response": sentiment_response}
        
        # Append user message to chat history
        chat_history.append({"role": "user", "parts": [{"text": user_input}]})

        # Use the correct Gemini model
        model = genai.GenerativeModel("gemini-1.5-pro-latest")  # Updated model name
        response = model.generate_content([{"role": "user", "parts": [{"text": user_input}]}])

        if not response or not hasattr(response, "text"):
            raise HTTPException(status_code=500, detail="Failed to generate response from Gemini API.")

        # Store AI response in chat history
        chat_history.append({"role": "model", "parts": [{"text": response.text}]})

        return {"response": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
def home():
    return {"message": "Medicine Reminder & Google Gemini API with FastAPI"}
