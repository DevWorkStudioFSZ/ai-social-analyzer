# utils/serp_api.py

import os
import requests
from dotenv import load_dotenv

load_dotenv()

def search_social_links(domain):
    api_key = os.getenv("SERPAPI_API_KEY")
    if not api_key:
        raise ValueError("SerpAPI key is missing. Please set SERPAPI_API_KEY in your environment.")

    query = f"{domain} site:linkedin.com OR site:facebook.com OR site:instagram.com OR site:twitter.com OR site:tiktok.com OR site:youtube.com"
    params = {
        "q": query,
        "engine": "google",
        "api_key": api_key,
        "num": 10
    }

    print(f"🔍 Querying SerpAPI for: {query}")
    response = requests.get("https://serpapi.com/search", params=params)

    if response.status_code != 200:
        raise Exception(f"SerpAPI request failed with status {response.status_code}: {response.text}")

    data = response.json()

    found = {}
    if "organic_results" in data:
        for result in data["organic_results"]:
            link = result.get("link", "")
            for platform in ["facebook", "linkedin", "instagram", "twitter", "tiktok", "youtube"]:
                if platform in link and platform not in found:
                    found[platform] = link

    print("✅ Found social links:", found)
    return found
