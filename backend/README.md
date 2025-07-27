# Human vs AI Backend

FastAPI backend for the Human vs AI application with Groq AI integration.

## Setup

1. **Install dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

2. **Set up environment variables:**

   - Copy `env.example` to `.env`
   - Add your Groq API key to the `.env` file:
     ```
     GROQ_API_KEY=your_actual_api_key_here
     ```

3. **Run the server:**
   ```bash
   uvicorn main:app --reload --host 127.0.0.1 --port 8000
   ```

## API Endpoints

- `GET /` - Health check
- `POST /analyze-text` - Analyze text with AI
- `POST /analyze-drawing` - Analyze drawing with AI
- `POST /submissions` - Save submission
- `GET /submissions` - Get all submissions
- `POST /submissions/{id}/vote` - Vote on submission

## Environment Variables

- `GROQ_API_KEY` - Your Groq API key (required)

## Security

- The `.env` file is ignored by git to protect your API key
- Never commit your actual API key to version control
