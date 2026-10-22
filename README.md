<h1 style="font-size: 3em; font-weight: 900;">🏛️ Samvidhaan Saral</h1>
From Legal Complexity to Everyday Clarity

An AI-powered civic-tech platform built to translate dense Indian legal jargon, municipal notices, and constitutional rights into plain-language summaries and actionable checklists.

Built for the Code Yudh 2026 Hackathon (Open Innovation Track) by Team Midnight Deployers.

✨ Core Features
📄 Document Simplifier: Upload legal PDFs or paste raw text to instantly generate plain-English executive summaries. Documents are processed completely in-memory for zero PII disk retention.

⚖️ Side-by-Side Dual Viewer: Compares original complex legal clauses directly against their simplified everyday meanings.

✅ Automated Action Checklists: Extracts actionable tasks (e.g., deadlines, fees, required signatures) from dense notices and categorizes them into an interactive checklist.

🔍 Contextual Legal Search: A dedicated search engine grounded in the Constitution of India, Bharatiya Nyaya Sanhita (BNS), and IPC, outputting structured civic rights and standard operating procedures.

📚 Statutory References: Automatically detects and lists specific legal acts or sections referenced within the uploaded document.

🛠️ Tech Stack Architecture
Frontend

React.js (Vite): Fast, component-based UI routing and state management.

CSS3: Custom minimalist engineering aesthetic (Deep Navy #004280 & Forest Green #004D40).

Backend

Flask (Python): REST API endpoints handling frontend requests and CORS.

Google Gemini API (gemini-3.8-flash): Strict JSON-schema enforced prompt engineering to prevent hallucination and ensure legally grounded outputs.

PyPDF2: In-memory byte-stream text extraction for uploaded PDFs.

MongoDB: (Optional/In-Memory Fallback) Stores anonymized query audit logs and session histories.

🚀 Local Development Setup
Follow these steps to run the project locally on your machine.

1. Backend Setup (Flask API)
Open a terminal and navigate to the project root:

Bash
# Navigate to the backend directory
cd "Code Yudh 2026/backend"

# Create and activate the virtual environment (Windows)
python -m venv venv
Set-ExecutionPolicy Unrestricted -Scope Process
.\venv\Scripts\Activate

# Install dependencies
pip install -r requirements.txt
Environment Variables:
Create a .env file inside the backend folder and add your Gemini API key:

Code snippet
GEMINI_API_KEY=your_actual_api_key_here
MONGO_URI=mongodb://localhost:27017/
Run the Server:

Bash
python app.py
The Flask API will start running on [http://127.0.0.1:5000](http://127.0.0.1:5000).

2. Frontend Setup (React/Vite)
Open a second terminal, keeping the backend server running:

Bash
# Navigate to the frontend directory
cd "Code Yudh 2026/frontend"

# Install Node modules
npm install

# Start the development server
npm run dev
The React application will start running on http://localhost:5173. Open this URL in your browser.

👥 Team Midnight Deployers
Yash Baranwal – Frontend Systems & UI/UX Architecture

MD Zaid Khan – Backend Systems & Infrastructure

Simranpreet Kaur – AI & NLP Integration Specialist

Institution: Chandigarh University

Track: Open Innovation / Smart & Sustainable Cities (E-Governance & CivicTech)
