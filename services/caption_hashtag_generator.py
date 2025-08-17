import google.generativeai as genai
import os
from dotenv import load_dotenv
from sqlalchemy.orm import Session
from db.database import SessionLocal
from db.models import GeneratedContent

# Load environment variables
load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def generate_caption_and_hashtags(
    brand_name: str,
    category: str,
    audience: str,
    tone: str = "engaging",
    platform: str = "General"
):
    """
    Generates caption + hashtags using Gemini API
    and saves output into generated_content table.
    """

    prompt = f"""
    Create one creative social media caption and 7-10 general-purpose hashtags.
    The content should be for a {category} brand named "{brand_name}" targeting {audience}.
    Tone should be {tone}.
    
    Example format:
    Caption: "..."
    Hashtags: #tag1 #tag2 #tag3 ...
    """

    try:
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(prompt)
        raw_text = response.text.strip()

        # Extract caption + hashtags
        caption, hashtags = None, None
        if "Caption:" in raw_text and "Hashtags:" in raw_text:
            parts = raw_text.split("Hashtags:")
            caption = parts[0].replace("Caption:", "").strip()
            hashtags = parts[1].strip()
        else:
            caption = raw_text
            hashtags = ""

        # ✅ Save to DB
        db: Session = SessionLocal()
        new_content = GeneratedContent(
            platform=platform,
            caption=caption,
            hashtags=hashtags,
            sentiment_score=0.0  # placeholder for now
        )
        db.add(new_content)
        db.commit()
        db.refresh(new_content)
        db.close()

        return {"caption": caption, "hashtags": hashtags}

    except Exception as e:
        print("ERROR in generate_caption_and_hashtags():", e)
        return {"error": str(e)}
