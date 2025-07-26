import { client } from "@gradio/client";

export const analyzeEmotion = async (inputText: string): Promise<string> => {
  try {
    // This is your Hugging Face Space
    const app = await client("https://samritak-emotion-api.hf.space/");
    
    // `/predict` is your function name in Gradio
    const result = await app.predict("/predict", [inputText]);

    const response = result.data?.[0];
    if (typeof response === "string") {
      return response;
    } else {
      return "Unexpected format from model.";
    }
  } catch (error) {
    console.error("Gradio API Error:", error);
    return "Sorry, something went wrong while analyzing.";
  }
};
