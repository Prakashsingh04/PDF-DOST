# utils/llm_helper.py

from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import torch

class AnswerGenerator:
    def __init__(self, model_name="google/flan-t5-small"):
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        self.tokenizer = AutoTokenizer.from_pretrained(model_name)
        self.model = AutoModelForSeq2SeqLM.from_pretrained(model_name).to(self.device)

    def generate_answer(self, question, context):
        prompt = f"Answer the following question based only on the context.\n\nContext: {context}\n\nQuestion: {question}"

        inputs = self.tokenizer(prompt, return_tensors="pt", truncation=True, max_length=512).to(self.device)
        outputs = self.model.generate(
            **inputs,
            max_new_tokens=100,
            temperature=0.7,
            top_p=0.9,
            do_sample=True,
            pad_token_id=self.tokenizer.eos_token_id
        )

        answer = self.tokenizer.decode(outputs[0], skip_special_tokens=True)
        return answer.strip()
