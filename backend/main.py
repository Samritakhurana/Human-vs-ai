from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional
from typing import List
# This list will store all submissions while the server is running
submissions = []

app = FastAPI()

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
    # For now, return a few fake responses
    fake_responses = [
        "AI says: 'I'm just a placeholder. Add your API key for real AI!'",
        "AI says: 'This is another possible interpretation.'",
        "AI says: 'A third possible AI response.'"
    ]
    return TextResponse(user_text=request.user_text, ai_responses=fake_responses)

class DrawingRequest(BaseModel):
    # For now, let's just accept a string (could be a description, or base64 image data later)
    drawing_data: str

class DrawingResponse(BaseModel):
    drawing_data: str
    ai_guess: str

@app.post("/analyze-drawing", response_model=DrawingResponse)
def analyze_drawing(request: DrawingRequest):
    # For now, just return a fake AI guess
    fake_guess = "AI guesses: 'This looks happy and creative!'"
    return DrawingResponse(drawing_data=request.drawing_data, ai_guess=fake_guess)

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