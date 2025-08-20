import google.generativeai as genai
import os
from dotenv import load_dotenv
# D:\marketmate\backend\services\post_generator.py
load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def generate_post_ideas(brand_name, category, audience, num_ideas=3):
    prompt = f"Generate {num_ideas} catchy Instagram post ideas with captions and hashtags for a {category} brand named '{brand_name}' targeting {audience}."
    print("Generated Prompt:", prompt)
    try:
        model = genai.GenerativeModel('gemini-1.5-flash-latest')
        response = model.generate_content(prompt)
        print("Raw Gemini Response:", response)
        return response.candidates[0].content.parts[0].text
    except Exception as e:
        print("ERROR inside generate_post_ideas():", e)
        raise e

