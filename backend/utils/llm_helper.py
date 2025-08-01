# utils/llm_helper.py

class AnswerGenerator:
    def __init__(self):
        pass  # You can load any LLM here later

    def generate_answer(self, question, context, max_len=250):
        prompt = f"""You are an expert summarizer. Based on the context below, answer the question in a concise, informative way.

Context:
{context}

Question: {question}
Answer:"""

        # For now, just return the prompt (later we'll call an LLM)
        return prompt
