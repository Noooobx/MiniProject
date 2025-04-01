from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import os
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
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

class PromptRequest(BaseModel):
    prompt: str

# Knowledge base for accurate responses
platform_knowledge = {
    "create auction": "To create an auction, click 'Create Auction' and enter the product name, description, starting price, quantity, start time, end time, and contact details. Click 'Submit' to finalize.",
    "inventory": "Farmers can add products they want to sell in the 'Inventory' section by specifying the category, product name, rate, quantity, and a small image. After submission, the product will be ready for sale.",
    "scheduled pickup": "Farmers can view all scheduled orders for their products in the 'Scheduled Pickup' section.",
    "deal history": "The 'Deal History' section lets farmers track past orders, including product name, quantity sold, final price, buyer details, and transaction date, helping them make better decisions.",
    "help & support": "Tutorial videos explaining how to use the website are available in the 'Help & Support' section.",
    "my profile": "Sellers can update their profile by clicking 'My Profile' in the top-right corner.",
    "news": "The 'News' section provides daily agricultural news updates.",
    "price": "The 'Price' section displays live prices of agricultural products.",
    "place bid": "To bid on an auction, enter an amount greater than the previous bid. If no new bids are placed within the timer, the last highest bidder wins.",
}

@app.post("/generate")
async def generate_text(request: PromptRequest):
    try:
        user_input = request.prompt.lower()

        # Check if the question matches a known feature
        for key, response in platform_knowledge.items():
            if key in user_input:
                return {"response": response}

        # Perform sentiment analysis
        sentiment = TextBlob(user_input).sentiment.polarity

        if sentiment < -0.3:
            return {"response": "I sense you're feeling down. I'm here to help. What's bothering you?"}

        # Fallback to Gemini AI if no match is found
        model = genai.GenerativeModel("gemini-1.5-pro-latest")
        response = model.generate_content([{"role": "user", "parts": [{"text": user_input}]}])

        return {"response": response.text if hasattr(response, "text") else "I'm not sure. Could you clarify?"}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
def home():
    return {"message": "Chatbot with platform-specific knowledge & Gemini AI"}
