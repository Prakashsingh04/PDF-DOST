def generate_answer(self, question, context, max_len=250):
    prompt = f"""You are an expert summarizer. Based on the context below, answer the question in a concise, informative way.

Context:
{context}

Question: {question}
Answer:"""
