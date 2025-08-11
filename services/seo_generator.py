import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def generate_seo_content(company_name, industry):
    model = genai.GenerativeModel('gemini-1.5-flash')

    prompt = f"""Based on a {industry} startup named '{company_name}', suggest:
    - 1 blog title
    - 1 meta description
    - 5 SEO keywords
    """

    response = model.generate_content(prompt)

    return response.text
