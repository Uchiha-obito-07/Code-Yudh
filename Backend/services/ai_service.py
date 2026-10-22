import os
import json
from google import genai
from google.genai import types
from dotenv import load_dotenv

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def simplify_legal_document(raw_text: str) -> dict:
    prompt = f"""
    You are a strictly grounded legal document parser for 'Samvidhaan Saral'.
    Analyze the following legal or civic document text. Do NOT invent facts, dates, or advice outside the text.
    If a deadline, fee, or obligation is not explicitly mentioned, do not guess it.

    Return a strict JSON object with this exact structure:
    {{
      "overall_summary": "A clear, 2-3 sentence plain-English summary of what this document is.",
      "clauses": [
        {{
          "original_clause": "Exact or condensed quote of the complex clause from the text",
          "simplified_meaning": "Plain-language explanation for an everyday citizen"
        }}
      ],
      "action_checklist": [
        {{
          "task": "Specific action required (e.g., Pay fee, Sign page 3, Submit form)",
          "deadline": "Explicit deadline stated in text, or 'No deadline specified'",
          "category": "Deadline | Fee | Signature | Compliance"
        }}
      ],
      "relevant_laws": [
        "Any IPC, BNS, or Constitutional Act explicitly referenced in the document (or 'None explicitly cited')"
      ]
    }}

    DOCUMENT TEXT:
    {raw_text[:15000]}
    """

    response = client.models.generate_content(
        model="gemini-3.8-flash",  # <--- Update this here
        contents=prompt,
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
            temperature=0.1
        )
    )
    return json.loads(response.text)

def search_legal_topic(query: str) -> dict:
    prompt = f"""
    You are an Indian Legal & Civic Information Assistant for 'Samvidhaan Saral'.
    Provide accurate, educational legal information (not personalized legal counsel) regarding the user's query under Indian law (Constitution of India, Bharatiya Nyaya Sanhita / IPC, consumer/property/civic laws).

    Return a strict JSON object with this exact structure:
    {{
      "topic_title": "Clear title of the legal topic",
      "simple_explanation": "Plain-language overview of how this works in India",
      "citizen_rights": [
        "Key right or protection available to the citizen"
      ],
      "relevant_provisions": [
        {{
          "section": "Article / BNS / IPC / Act Section Number",
          "description": "What this specific law states in simple words"
        }}
      ],
      "standard_procedure": [
        "Step 1: ...",
        "Step 2: ..."
      ],
      "disclaimer": "This is structured legal information for civic awareness and does not substitute a certified legal professional."
    }}

    USER QUERY: {query}
    """

    response = client.models.generate_content(
        model="gemini-3.8-flash",  # <--- And update this here too
        contents=prompt,
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
            temperature=0.2
        )
    )
    return json.loads(response.text)