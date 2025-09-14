export async function handler(event, context) {
  const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
  const { message } = JSON.parse(event.body || "{}");

  if (!message) {
    return {
      statusCode: 400,
      body: JSON.stringify({ reply: "No message provided" }),
    };
  }

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
              content: "You are a disaster education assistant...",
            },
            { role: "user", content: message },
          ],
          temperature: 0.7,
          max_tokens: 500,
        }),
      }
    );

    const data = await response.json();
    const reply =
      data.choices?.[0]?.message?.content ||
      "Sorry, couldn't generate a response.";

    return { statusCode: 200, body: JSON.stringify({ reply }) };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ reply: "Error contacting API" }),
    };
  }
}
