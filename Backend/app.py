from flask import Flask, request, jsonify
from flask_cors import CORS
from services.pdf_service import extract_text_from_pdf
from services.ai_service import simplify_legal_document, search_legal_topic
from database.db import log_query

app = Flask(__name__)
CORS(app)

@app.route("/api/health", methods=["GET"])
def health_check():
    return jsonify({"status": "ok", "service": "Samvidhaan Saral Backend"})

@app.route("/api/simplify", methods=["POST"])
def simplify_endpoint():
    try:
        extracted_text = ""
        
        # Check if a PDF file was uploaded
        if "file" in request.files:
            pdf_file = request.files["file"]
            if pdf_file.filename == "":
                return jsonify({"error": "No file selected"}), 400
            file_bytes = pdf_file.read()
            extracted_text = extract_text_from_pdf(file_bytes)
            log_query("document_upload", {"file_size_bytes": len(file_bytes)})
        
        # Or check if raw text was pasted
        elif request.is_json and "text" in request.json:
            extracted_text = request.json["text"].strip()
            log_query("text_paste", {"char_length": len(extracted_text)})
            
        if not extracted_text:
            return jsonify({"error": "Please provide a valid PDF or legal text to simplify."}), 400

        result = simplify_legal_document(extracted_text)
        return jsonify(result), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/search", methods=["POST"])
def search_endpoint():
    try:
        data = request.get_json()
        query = data.get("query", "").strip()
        if not query:
            return jsonify({"error": "Search query cannot be empty."}), 400

        log_query("legal_search", {"query_length": len(query)})
        result = search_legal_topic(query)
        return jsonify(result), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)