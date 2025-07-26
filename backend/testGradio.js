import { client } from "@gradio/client";

async function callAPI() {
  const app = await client("https://samritak-emotion-api.hf.space/");
  
  const result = await app.predict("/predict", [
    "I’m feeling really happy today!"  // Replace with your input text
  ]);

  console.log(result.data);  // Output will be something like ["joy"]
}

callAPI();
