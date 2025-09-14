import fetch from "node-fetch";

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

    if (!data.choices || data.choices.length === 0) {
      return "Sorry, I couldn't generate a response.";
    }

    let reply = data.choices[0].message?.content || "";
    reply = reply.replace(/\*/g, "").replace(/---/g, "");

    return reply;
  } catch (err) {
    console.error("Error calling DeepSeek API:", err);
    return "Error contacting DeepSeek API.";
  }
};

export async function handler(event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { message } = JSON.parse(event.body || "{}");
  if (!message) {
    return {
      statusCode: 400,
      body: JSON.stringify({ reply: "No message provided" }),
    };
  }

  const reply = await callDeepSeekAPI(message);
  return {
    statusCode: 200,
    body: JSON.stringify({ reply }),
  };
}
