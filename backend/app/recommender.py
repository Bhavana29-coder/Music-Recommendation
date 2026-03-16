import numpy as np
from sklearn.metrics.pairwise import cosine_similarity


class MusicRecommender:
    def __init__(self, data):
        print("PKL keys:", data.keys())
        self.song_names = list(data["song_names"])
        self.embeddings = data["embeddings"]

        # ✅ NEW: audio features (same shape as embeddings)
        self.features = data.get("features", self.embeddings)

    # =====================
    # EXISTING
    # =====================
    def get_all_songs(self):
        return self.song_names

    def get_similar_songs(self, song_name, top_k=4):
        if song_name not in self.song_names:
            return []

        idx = self.song_names.index(song_name)
        query = self.embeddings[idx].reshape(1, -1)

        similarities = cosine_similarity(query, self.embeddings)[0]

        ranked = sorted(
            zip(self.song_names, similarities),
            key=lambda x: x[1],
            reverse=True
        )

        return [
            {"song": song, "score": float(score)}
            for song, score in ranked[1:top_k + 1]
        ]

    def recommend_for_user(self, listened_songs, top_k=4):
        vectors = [
            self.embeddings[self.song_names.index(song)]
            for song in listened_songs
            if song in self.song_names
        ]

        if not vectors:
            return []

        user_vector = np.mean(vectors, axis=0).reshape(1, -1)
        similarities = cosine_similarity(user_vector, self.embeddings)[0]

        ranked = sorted(
            zip(self.song_names, similarities),
            key=lambda x: x[1],
            reverse=True
        )

        return [
            {"song": song, "score": float(score)}
            for song, score in ranked[:top_k]
        ]

    # =====================
    # ✅ NEW FEATURE API
    # =====================
    def get_song_features(self, song_name):
        if song_name not in self.song_names:
            return {}

        idx = self.song_names.index(song_name)

        vec = self.features[idx]

        # return first 10 PCA values (UI friendly)
        return {
            "pca_features": vec[:10].tolist()
        }
