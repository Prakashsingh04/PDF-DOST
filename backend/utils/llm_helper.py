# utils/llm_helper.py
import os
import logging
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class AnswerGenerator:
    def __init__(self):
        self.api_key = os.getenv("GEMINI_API_KEY")
        if not self.api_key:
            raise ValueError("GEMINI_API_KEY not found in .env file")

        genai.configure(api_key=self.api_key)

        # You can switch between gemini-1.5-flash and gemini-1.5-pro
        self.model = genai.GenerativeModel("gemini-1.5-flash")

    def generate_answer(self, question, context, streaming=False):
        """
        Generates an answer to a given question using only the provided context.

        Args:
            question (str): The question to be answered.
            context (str): The relevant context from which to answer.
            streaming (bool): Whether to stream the response in chunks.

        Returns:
            str: The generated answer.
        """

        prompt = (
            "You are a precise, helpful assistant.\n"
            "Answer the question using ONLY the provided context.\n"
            "If the answer is not explicitly in the context, reply exactly:\n"
            "\"I could not find the answer in the document.\"\n\n"
            f"Context:\n{context}\n\n"
            f"Question: {question}\n"
            "Answer clearly in 3-5 sentences. Use bullet points if listing items:\n"
        )

        try:
            if streaming:
                logger.info("[Gemini] Starting streaming generation...")
                stream = self.model.generate_content(prompt, stream=True)
                collected_text = ""
                for chunk in stream:
                    if chunk.candidates and chunk.candidates[0].content.parts:
                        part = chunk.candidates[0].content.parts[0].text
                        if part:
                            collected_text += part
                            print(part, end="", flush=True)  # real-time printing
                return collected_text.strip()
            else:
                logger.info("[Gemini] Sending prompt for generation...")
                response = self.model.generate_content(prompt)
                if not response or not response.text.strip():
                    logger.warning("[Gemini] Empty response from model.")
                    return "I could not find the answer in the document."
                return response.text.strip()

        except Exception as e:
            logger.error(f"[Gemini] Error generating answer: {e}")
            return f"Error generating answer: {str(e)}"
