import os
from groq import Groq
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from typing import List
from dotenv import load_dotenv

# Load environment variables from .env file
try:
    load_dotenv()
except UnicodeDecodeError:
    print("Warning: .env file has encoding issues. Please recreate it with UTF-8 encoding.")
    # Continue without .env file
except Exception as e:
    print(f"Warning: Could not load .env file: {e}")
    # Continue without .env file

# Set up Groq client with API key from .env file
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
if not GROQ_API_KEY:
    raise ValueError("GROQ_API_KEY environment variable is not set. Please create a .env file with your API key.")

client = Groq(api_key=GROQ_API_KEY)

# This list will store all submissions while the server is running
submissions = []

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173", 
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://localhost:3001", 
        "http://localhost:3002",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3001",
        "http://127.0.0.1:3002"
    ],  # React dev server ports
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI is working!"}

# Define what data we expect from the frontend
class TextRequest(BaseModel):
    user_text: str

class TextResponse(BaseModel):
    user_text: str
    ai_responses: str

@app.post("/analyze-text", response_model=TextResponse)
def analyze_text(request: TextRequest):
    try:
        # Call Groq API
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": request.user_text,
                }
            ],
            model="llama-3.3-70b-versatile",
        )
        ai_response = chat_completion.choices[0].message.content
        return TextResponse(user_text=request.user_text, ai_responses=ai_response)
    except Exception as e:
        # Return error message if AI call fails
        error_response = f"Error calling AI service: {str(e)}"
        return TextResponse(user_text=request.user_text, ai_responses=error_response)

class DrawingRequest(BaseModel):
    # For now, let's just accept a string (could be a description, or base64 image data later)
    drawing_data: str

class DrawingResponse(BaseModel):
    drawing_data: str
    ai_guess: str

@app.post("/analyze-drawing", response_model=DrawingResponse)
def analyze_drawing(request: DrawingRequest):
    try:
        # Create a prompt for analyzing the drawing
        prompt = f"Analyze this drawing description and provide an insightful interpretation: {request.drawing_data}"
        
        # Call Groq API
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
            model="llama-3.3-70b-versatile",
        )
        ai_guess = chat_completion.choices[0].message.content
        return DrawingResponse(drawing_data=request.drawing_data, ai_guess=ai_guess)
    except Exception as e:
        # Return error message if AI call fails
        error_response = f"Error analyzing drawing: {str(e)}"
        return DrawingResponse(drawing_data=request.drawing_data, ai_guess=error_response)

class Submission(BaseModel):
    id: int
    type: str  # 'drawing' or 'text'
    user_content: str  # drawing_data (base64) or user_text
    ai_response: str
    votes: int = 0

@app.post("/submissions", response_model=Submission)
def save_submission(submission: Submission):
    submissions.append(submission)
    return submission

@app.get("/submissions", response_model=List[Submission])
def get_submissions():
    return submissions

@app.post("/submissions/{submission_id}/vote", response_model=Submission)
def vote_submission(submission_id: int):
    for sub in submissions:
        if sub.id == submission_id:
            sub.votes += 1
            return sub
    return {"error": "Submission not found"}