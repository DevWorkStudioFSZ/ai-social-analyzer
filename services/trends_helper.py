# backend/api/services/trends_helper.py

from random import sample

def trending_hours_for_keywords(keywords: list[str], top_n: int = 3) -> dict:
    """
    Returns dummy top trending hours (0-23) for each keyword.
    Replace this with real Google Trends logic if needed.
    
    Args:
        keywords: list of keyword strings
        top_n: number of top hours to return per keyword
    
    Returns:
        dict: { keyword1: [hour1, hour2, ...], keyword2: [...], ... }
    """
    results = {}
    for kw in keywords:
        # Return random unique hours
        results[kw] = sorted(sample(range(24), k=min(top_n, 24)))
    return results
