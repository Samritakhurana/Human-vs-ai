const API_BASE_URL = "http://127.0.0.1:8000";

export interface TextRequest {
  user_text: string;
}

export interface TextResponse {
  user_text: string;
  ai_responses: string;
}

export interface DrawingRequest {
  drawing_data: string;
}

export interface DrawingResponse {
  drawing_data: string;
  ai_guess: string;
}

export interface Submission {
  id: number;
  type: string;
  user_content: string;
  ai_response: string;
  votes: number;
}

// Text Analysis API
export const analyzeText = async (text: string): Promise<string> => {
  try {
    console.log("Sending text analysis request:", { text });

    const response = await fetch(`${API_BASE_URL}/analyze-text`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_text: text }),
    });

    console.log("Response status:", response.status);
    console.log("Response headers:", response.headers);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Response error text:", errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: TextResponse = await response.json();
    console.log("Response data:", data);
    return data.ai_responses;
  } catch (error) {
    console.error("Error analyzing text:", error);
    throw new Error("Failed to analyze text with AI");
  }
};

// Drawing Analysis API
export const analyzeDrawing = async (drawingData: string): Promise<string> => {
  try {
    const response = await fetch(`${API_BASE_URL}/analyze-drawing`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ drawing_data: drawingData }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: DrawingResponse = await response.json();
    return data.ai_guess;
  } catch (error) {
    console.error("Error analyzing drawing:", error);
    throw new Error("Failed to analyze drawing with AI");
  }
};

// Save Submission API
export const saveSubmission = async (
  submission: Omit<Submission, "id">
): Promise<Submission> => {
  try {
    const response = await fetch(`${API_BASE_URL}/submissions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submission),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error saving submission:", error);
    throw new Error("Failed to save submission");
  }
};

// Get All Submissions API
export const getSubmissions = async (): Promise<Submission[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/submissions`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching submissions:", error);
    throw new Error("Failed to fetch submissions");
  }
};

// Vote on Submission API
export const voteSubmission = async (
  submissionId: number
): Promise<Submission> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/submissions/${submissionId}/vote`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error voting on submission:", error);
    throw new Error("Failed to vote on submission");
  }
};
