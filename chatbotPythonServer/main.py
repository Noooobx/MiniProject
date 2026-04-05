from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import os
import base64
from io import BytesIO
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
from gtts import gTTS

# Load environment variables
load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    # Use a dummy key if missing to prevent startup crash, but error later
    api_key = "MISSING"

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
        matched = False
        
        # 1. Check Platform Knowledge
        for key, response in platform_knowledge.items():
            if key in user_input:
                response_text = response
                matched = True
                break

        # 2. Fallback to Gemini
        if not matched:
            if api_key == "MISSING":
                response_text = "Sorry, I'm missing my AI Brain (Gemini API Key). Please check the backend setup."
            else:
                prompt_with_lang = f"Respond in {language}. User asks: {user_input}"
                model = genai.GenerativeModel("gemini-1.5-pro-latest")
                response = model.generate_content([{"role": "user", "parts": [{"text": prompt_with_lang}]}])
                response_text = response.text if hasattr(response, "text") else "I'm not sure. Could you clarify?"

        # 3. Handle Voice (Base64)
        audio_base64 = None
        if voice_enabled:
            try:
                tts = gTTS(text=response_text, lang=language)
                audio_fp = BytesIO()
                tts.write_to_fp(audio_fp)
                audio_fp.seek(0)
                audio_base64 = "data:audio/mp3;base64," + base64.b64encode(audio_fp.read()).decode("utf-8")
            except Exception as audio_err:
                # Still return text if audio fails
                print(f"Audio Error: {audio_err}")

        return {
            "text": response_text,
            "response": response_text,
            "audio": audio_base64
        }
    
    except Exception as e:
        print(f"Global Error: {e}")
        return {"text": f"Error: {str(e)}", "response": f"Error: {str(e)}", "audio": None}

@app.get("/")
def home():
    return {"status": "online", "message": "Chatbot ready"}
