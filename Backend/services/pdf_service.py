import io
from PyPDF2 import PdfReader

def extract_text_from_pdf(file_bytes: bytes) -> str:
    """Extracts raw text from a PDF file stream in memory."""
    reader = PdfReader(io.BytesIO(file_bytes))
    extracted_pages = []
    
    for page_num, page in enumerate(reader.pages, start=1):
        text = page.extract_text()
        if text:
            extracted_pages.append(f"--- Page {page_num} ---\n{text.strip()}")
            
    return "\n\n".join(extracted_pages)