# Human vs AI Backend

A FastAPI backend service that powers the Human vs AI application, providing AI-powered text and drawing analysis using Groq's LLM API.

## Features

- **Text Analysis**: Analyze user emotions and thoughts using Groq's Llama 3.3-70B model
- **Drawing Analysis**: Interpret user drawings and provide AI insights
- **Submission Management**: Store and retrieve user submissions with voting system
- **Real-time AI Responses**: Fast, intelligent responses using state-of-the-art language models
- **CORS Support**: Configured for frontend integration
- **Environment-based Configuration**: Secure API key management

## Tech Stack

- **Framework**: FastAPI (Python)
- **AI Provider**: Groq (Llama 3.3-70B Versatile)
- **Server**: Uvicorn
- **Environment Management**: python-dotenv
- **Data Validation**: Pydantic

## Prerequisites

- Python 3.8+
- Groq API key
- pip (Python package manager)

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd Human-vs-ai/backend
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Environment Configuration

Create a `.env` file in the backend directory:

```bash
# Copy the example file
cp env.example .env

# Edit .env and add your Groq API key
GROQ_API_KEY=your_actual_groq_api_key_here
```

### 4. Run the Server

```bash
# Development mode with auto-reload
uvicorn main:app --reload --host 127.0.0.1 --port 8000

# Production mode
uvicorn main:app --host 0.0.0.0 --port 8000
```

## API Documentation

Once the server is running, visit:

- **Interactive API Docs**: http://127.0.0.1:8000/docs
- **Alternative Docs**: http://127.0.0.1:8000/redoc

## API Endpoints

### Health Check

```
GET /
```

Returns server status and confirmation that FastAPI is working.

### Text Analysis

```
POST /analyze-text
```

Analyzes user text using Groq's AI model.

**Request Body:**

```json
{
  "user_text": "I am feeling happy today because..."
}
```

**Response:**

```json
{
  "user_text": "I am feeling happy today because...",
  "ai_responses": "AI analysis of the user's emotional state..."
}
```

### Drawing Analysis

```
POST /analyze-drawing
```

Analyzes user drawings and provides AI interpretation.

**Request Body:**

```json
{
  "drawing_data": "base64_encoded_image_or_description"
}
```

**Response:**

```json
{
  "drawing_data": "base64_encoded_image_or_description",
  "ai_guess": "AI interpretation of the drawing..."
}
```

### Submission Management

#### Save Submission

```
POST /submissions
```

Saves a user submission to the database.

**Request Body:**

```json
{
  "id": 1,
  "type": "text",
  "user_content": "User's original content",
  "ai_response": "AI's response",
  "votes": 0
}
```

#### Get All Submissions

```
GET /submissions
```

Retrieves all stored submissions.

**Response:**

```json
[
  {
    "id": 1,
    "type": "text",
    "user_content": "User's content",
    "ai_response": "AI's response",
    "votes": 5
  }
]
```

#### Vote on Submission

```
POST /submissions/{submission_id}/vote
```

Increments the vote count for a specific submission.

## Security Features

- **Environment Variables**: API keys stored securely in `.env` files
- **CORS Configuration**: Properly configured for frontend integration
- **Input Validation**: All requests validated using Pydantic models
- **Error Handling**: Comprehensive error handling for API failures

## CORS Configuration

The backend is configured to accept requests from:

- `http://localhost:5173` (Vite dev server)
- `http://localhost:3000-3002` (Alternative dev ports)
- `http://127.0.0.1:5173` and `http://127.0.0.1:3000-3002`

## Project Structure

```
backend/
├── main.py              # Main FastAPI application
├── requirements.txt     # Python dependencies
├── .env                 # Environment variables (not in git)
├── .gitignore          # Git ignore rules
├── env.example         # Example environment file
└── README.md           # This file
```

## Deployment

### Local Development

```bash
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

### Production Deployment

For production deployment on platforms like Railway, Render, or Heroku:

1. **Set Environment Variables**:

   - `GROQ_API_KEY`: Your Groq API key
   - `PORT`: Port number (usually set by the platform)

2. **Install Dependencies**:

   ```bash
   pip install -r requirements.txt
   ```

3. **Start Server**:
   ```bash
   uvicorn main:app --host 0.0.0.0 --port $PORT
   ```

## Configuration

### Environment Variables

| Variable       | Description       | Required | Default |
| -------------- | ----------------- | -------- | ------- |
| `GROQ_API_KEY` | Your Groq API key | Yes      | None    |
| `PORT`         | Server port       | No       | 8000    |

### AI Model Configuration

The backend uses Groq's `llama-3.3-70b-versatile` model for:

- Text analysis and emotion detection
- Drawing interpretation
- General conversation and insights

## Troubleshooting

### Common Issues

1. **API Key Not Found**

   ```
   ValueError: GROQ_API_KEY environment variable is not set
   ```

   **Solution**: Ensure your `.env` file exists and contains the correct API key.

2. **CORS Errors**

   ```
   Access to fetch at 'http://127.0.0.1:8000/...' from origin '...' has been blocked
   ```

   **Solution**: Check that your frontend URL is included in the CORS configuration.

3. **Module Not Found**
   ```
   ModuleNotFoundError: No module named 'groq'
   ```
   **Solution**: Install dependencies with `pip install -r requirements.txt`.

### Debug Mode

Enable debug logging by setting the log level:

```bash
uvicorn main:app --reload --log-level debug
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is part of the Human vs AI application.

## Support

For issues and questions:

1. Check the troubleshooting section above
2. Review the API documentation at `/docs`
3. Open an issue in the repository

---

**Note**: This backend is designed to work with the Human vs AI frontend application. Make sure both frontend and backend are properly configured for full functionality.
