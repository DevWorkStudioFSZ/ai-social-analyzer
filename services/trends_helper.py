# backend/services/trends_helper.py
from pytrends.request import TrendReq
import pandas as pd

def trending_hours_for_keywords(
    keywords: list[str],
    region: str = "PK",
) -> list[str]:
    """
    Pull last-7-days hourly Google Trends data and return top 3 hours.
    Returns [] if no usable results.
    """
    try:
        pytrends = TrendReq(hl="en-US", tz=300)  # tz=300 ~ UTC+5 (Pakistan), adjust by region if needed

        frames = []
        for kw in keywords:
            try:
                pytrends.build_payload([kw], timeframe="now 7-d", geo=region)
                df = pytrends.interest_over_time()
                if df is None or df.empty or "isPartial" not in df.columns:
                    continue
                df = df.rename(columns={kw: "value"})
                df = df[~df["isPartial"]]
                if df.empty:
                    continue
                df["hour"] = df.index.hour
                frames.append(df[["hour", "value"]])
            except Exception:
                continue

        if not frames:
            return []

        cat = pd.concat(frames, ignore_index=True)
        avg = cat.groupby("hour")["value"].mean().sort_values(ascending=False)
        top_hours = list(avg.head(3).index)

        return [f"{h:02d}:00 – {((h + 1) % 24):02d}:00" for h in top_hours]
    except Exception:
        return []
