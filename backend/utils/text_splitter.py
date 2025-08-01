from typing import List

def split_text(text: str, chunk_size: int = 500, overlap: int = 100) -> List[str]:
    """
    Split large text into smaller overlapping chunks.
    
    Args:
        text (str): The full extracted text.
        chunk_size (int): Max characters in one chunk.
        overlap (int): Overlap characters between chunks to maintain context.

    Returns:
        List[str]: List of text chunks.
    """
    chunks = []
    start = 0
    text_length = len(text)
    
    while start < text_length:
        end = min(start + chunk_size, text_length)
        chunk = text[start:end].strip()
        chunks.append(chunk)
        start += chunk_size - overlap
    
    return chunks
