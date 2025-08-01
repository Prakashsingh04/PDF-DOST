from sentence_transformers import SentenceTransformer
import os

class Embedder:
    def __init__(self, model_name="all-MiniLM-L6-v2"):
        self.model = SentenceTransformer(model_name)

    def get_embeddings(self, chunks):
        embeddings = self.model.encode(chunks, convert_to_tensor=True)
        return embeddings
