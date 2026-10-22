import os
from datetime import datetime, timezone
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

mongo_uri = os.getenv("MONGO_URI", "mongodb://localhost:27017/")

try:
    client = MongoClient(mongo_uri, serverSelectionTimeoutMS=2000)
    db = client["samvidhaan_saral"]
    logs_collection = db["audit_logs"]
    # Trigger connection check
    client.server_info()
    DB_CONNECTED = True
except Exception as e:
    print(f"[Warning] MongoDB not connected, running in in-memory mode: {e}")
    DB_CONNECTED = False
    in_memory_logs = []

def log_query(query_type: str, metadata: dict):
    """Logs anonymized activity without storing PII."""
    entry = {
        "type": query_type,
        "metadata": metadata,
        "timestamp": datetime.now(timezone.utc).isoformat()
    }
    if DB_CONNECTED:
        logs_collection.insert_one(entry)
    else:
        in_memory_logs.append(entry)