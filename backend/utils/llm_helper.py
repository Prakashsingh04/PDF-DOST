from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline
import torch

class AnswerGenerator:
    def __init__(self):
        print("🚀 Loading Phi-1.5 model for faster inference...")

        self.tokenizer = AutoTokenizer.from_pretrained("microsoft/phi-1_5")  # You said you're using 1.5
        self.model = AutoModelForCausalLM.from_pretrained(
            "microsoft/phi-1_5",
            torch_dtype=torch.float16 if torch.cuda.is_available() else torch.float32,
            device_map="auto"  # Uses accelerate, don't set device below
        )

        self.qa_pipeline = pipeline(
            "text-generation",
            model=self.model,
            tokenizer=self.tokenizer
            # 🚫 remove device=... here
        )

    def generate_answer(self, question, context, max_len=250):
        prompt = f"""You are an expert assistant. Based on the context below, answer the question concisely.

Context:
{context}

Question: {question}
Answer:"""

        response = self.qa_pipeline(
            prompt,
            max_length=max_len,
            do_sample=True,
            temperature=0.7,
            top_p=0.9
        )

        generated_text = response[0]['generated_text']
        answer = generated_text.split("Answer:")[-1].strip()
        return answer
