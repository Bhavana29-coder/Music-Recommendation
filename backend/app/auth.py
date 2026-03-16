import sqlite3
import os
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from werkzeug.security import generate_password_hash, check_password_hash

router = APIRouter()

# ✅ Get database path dynamically
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DB_PATH = os.path.join(BASE_DIR, "model", "users.db")

# ✅ Create users table if it doesn't exist
def init_db():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT UNIQUE,
            password TEXT
        )
    """)
    conn.commit()
    conn.close()

init_db()


# ✅ Request Models
class SignupRequest(BaseModel):
    name: str
    email: str
    password: str


class LoginRequest(BaseModel):
    email: str
    password: str


# ✅ Signup Endpoint
@router.post("/signup")
def signup(user: SignupRequest):
    hashed_pw = generate_password_hash(user.password)
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()

    try:
        c.execute(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
            (user.name, user.email, hashed_pw),
        )
        conn.commit()

        # ✅ Return user details for frontend
        return {
            "message": "User created successfully",
            "user": {"name": user.name, "email": user.email},
        }

    except sqlite3.IntegrityError:
        raise HTTPException(status_code=400, detail="Email already registered")

    finally:
        conn.close()


# ✅ Login Endpoint
@router.post("/login")
def login(user: LoginRequest):
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("SELECT name, email, password FROM users WHERE email = ?", (user.email,))
    row = c.fetchone()
    conn.close()

    if row and check_password_hash(row[2], user.password):
        name, email, _ = row
        # ✅ Send name & email so frontend can store and display it
        return {
            "message": "Login successful",
            "user": {"name": name, "email": email},
        }

    raise HTTPException(status_code=401, detail="Invalid credentials")