import requests
import os

SERPAPI_API_KEY = os.getenv("SERPAPI_API_KEY")

SOCIAL_PLATFORMS = ["linkedin", "facebook", "instagram", "twitter", "tiktok", "youtube"]

def discover_social_profiles(domain: str):
    """
    Discover social profiles using SerpAPI if available.
    If SerpAPI fails (quota, key missing, etc.), return safe fallback.
    """
    if not SERPAPI_API_KEY:
        print("⚠️ SerpAPI key missing, using fallback.")
        return {
            "found": [],
            "missing": SOCIAL_PLATFORMS
        }

    try:
        query = f"{domain} site:" + " OR site:".join([f"{p}.com" for p in SOCIAL_PLATFORMS])
        url = "https://serpapi.com/search"
        params = {"q": query, "api_key": SERPAPI_API_KEY, "engine": "google"}
        response = requests.get(url, params=params, timeout=10)

        if response.status_code != 200:
            raise Exception(f"SerpAPI request failed with status {response.status_code}: {response.text}")

        data = response.json()
        found = []
        missing = SOCIAL_PLATFORMS.copy()

        # ✅ Parse only if results exist
        for res in data.get("organic_results", []):
            link = res.get("link", "")
            for platform in SOCIAL_PLATFORMS:
                if platform in link and link not in found:
                    found.append(link)
                    if platform in missing:
                        missing.remove(platform)

        # ✅ If nothing was found, still return consistent structure
        return {
            "found": found,
            "missing": missing
        }

    except Exception as e:
        print(f"⚠️ SerpAPI discovery failed: {e}")
        # ✅ Always return fallback instead of breaking
        return {
            "found": [],
            "missing": SOCIAL_PLATFORMS
        }
