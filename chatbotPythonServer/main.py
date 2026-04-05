from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import os
import base64
from io import BytesIO
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
from textblob import TextBlob
from gtts import gTTS

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
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PromptRequest(BaseModel):
    prompt: str
    language: str = "en"
    voice: bool = False

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
        language = request.language
        voice_enabled = request.voice

        response_text = ""

        # Check if the question matches a known feature
        matched = False
        for key, response in platform_knowledge.items():
            if key in user_input:
                response_text = response
                matched = True
                break

        if not matched:
            # Perform sentiment analysis
            sentiment = TextBlob(user_input).sentiment.polarity
            if sentiment < -0.3:
                response_text = "I sense you're feeling down. I'm here to help. What's bothering you?"
            else:
                # Fallback to Gemini AI if no match is found
                # Add language instruction to prompt
                prompt_with_lang = f"Respond in {language}: {user_input}"
                model = genai.GenerativeModel("gemini-1.5-pro-latest")
                response = model.generate_content([{"role": "user", "parts": [{"text": prompt_with_lang}]}])
                response_text = response.text if hasattr(response, "text") else "I'm not sure. Could you clarify?"

        audio_base64 = None
        if voice_enabled:
            try:
                # Generate audio using gTTS and save to a BytesIO object (in-memory)
                tts = gTTS(text=response_text, lang=language)
                audio_fp = BytesIO()
                tts.write_to_fp(audio_fp)
                audio_fp.seek(0)
                
                # Convert audio to Base64 to avoid file system issues on Vercel
                audio_base64 = "data:audio/mp3;base64," + base64.b64encode(audio_fp.read()).decode("utf-8")
            except Exception as audio_err:
                print(f"Audio generation error: {audio_err}")

        # Return both 'text' (Vercel standard) and 'response' (compat)
        return {
            "text": response_text,
            "response": response_text,
            "audio": audio_base64
        }
    
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
def home():
    return {"message": "Chatbot with platform-specific knowledge & Gemini AI"}
