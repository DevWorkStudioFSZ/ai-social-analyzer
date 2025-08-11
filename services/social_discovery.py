from typing import Dict
from utils.serp_api import search_social_links

ALL_PLATFORMS = ["facebook", "linkedin", "instagram", "twitter", "tiktok", "youtube"]

def discover_social_profiles(domain: str) -> Dict:
    try:
        found_profiles = search_social_links(domain)
        missing_platforms = [p for p in ALL_PLATFORMS if p not in found_profiles]

        return {
            "found": found_profiles,
            "missing": missing_platforms
        }

    except ValueError as ve:
        raise ve
    except Exception as e:
        raise Exception(f"Discovery failed: {str(e)}")
