import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def generate_strategy_recommendations(category, scope):
    model = genai.GenerativeModel('gemini-1.5-flash')

    prompt = f"""Suggest a social media posting strategy for a {category} brand with a {scope} business scope.
    Include platforms (Facebook, Instagram, TikTok), post frequency, content types, and tone."""

    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        print(f"Error occurred: {e}")
        return "Failed to generate strategy due to API error."
