import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

class Retriever:
    def __init__(self, embedder, chunks, embeddings):
        """
        :param embedder: An instance of Embedder class
        :param chunks: List of text chunks
        :param embeddings: Embeddings of the chunks (numpy or tensor, shape: [n_chunks, dim])
        """
        self.embedder = embedder
        self.chunks = chunks
        self.embeddings = embeddings

    def retrieve(self, question, top_k=3):
        """
        Returns top_k most relevant chunks to the question.
        """
        question_embedding = self.embedder.get_embeddings([question])  # shape: [1, dim]

        # If embeddings are tensors, convert to numpy
        if hasattr(self.embeddings, 'cpu'):
            embeddings_np = self.embeddings.cpu().detach().numpy()
        else: 
            embeddings_np = np.array(self.embeddings)

        # Also convert question embedding to numpy
        if hasattr(question_embedding, 'cpu'):
            question_embedding = question_embedding.cpu().detach().numpy()

        similarities = cosine_similarity(question_embedding, embeddings_np)[0]  # shape: [n_chunks]
        top_indices = similarities.argsort()[-top_k:][::-1]  # top k highest similarities

        top_chunks = [self.chunks[i] for i in top_indices]
        return top_chunks
