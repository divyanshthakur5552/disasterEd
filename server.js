import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;

const callDeepSeekAPI = async (message) => {
  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-chat-v3.1",
          messages: [
            {
              role: "system",
              content:
                "You are a disaster education assistant. Respond in structured, easy-to-read format suitable for studying. Use headings, numbered lists, and bullet points. Avoid raw markdown symbols like `*`.",
            },
            { role: "user", content: message },
          ],
          temperature: 0.7,
          max_tokens: 500,
        }),
      }
    );

    const data = await response.json();
    console.log("DeepSeek API response:", data);

    // Make sure choices exist
    if (!data.choices || data.choices.length === 0) {
      return "Sorry, I couldn't generate a response.";
    }

    // Clean response: remove extra markdown characters if present
    let reply = data.choices[0].message?.content || "";
    reply = reply.replace(/\*/g, ""); // remove * symbols
    reply = reply.replace(/---/g, ""); // remove unnecessary lines

    return reply;
  } catch (err) {
    console.error("Error calling DeepSeek API:", err);
    return "Error contacting DeepSeek API.";
  }
};

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ reply: "No message provided" });

  const reply = await callDeepSeekAPI(message);
  res.json({ reply });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
