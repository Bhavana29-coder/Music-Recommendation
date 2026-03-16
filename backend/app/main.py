import os
import joblib
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.recommender import MusicRecommender
from app.auth import router as auth_router   # ✅ Import auth routes

app = FastAPI(title="Music Recommendation API")

# ✅ CORS CONFIG
# ✅ CORS CONFIG (allow both localhost & 127.0.0.1)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PKL_PATH = os.path.join(BASE_DIR, "model", "music_ai_data.pkl")

print("🔍 Loading PKL from:", PKL_PATH)

data = joblib.load(PKL_PATH)
recommender = MusicRecommender(data)

@app.get("/")
def root():
    return {"status": "Backend running"}

@app.get("/songs")
def get_songs():
    return recommender.get_all_songs()

@app.get("/similar/{song_name}")
def similar_songs(song_name: str, k: int = 4):
    return recommender.get_similar_songs(song_name, k)

@app.get("/features/{song_name}")
def song_features(song_name: str):
    return recommender.get_song_features(song_name)

# ✅ Include auth routes
app.include_router(auth_router, prefix="/api", tags=["Auth"])