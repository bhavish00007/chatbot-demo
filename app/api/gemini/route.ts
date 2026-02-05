import { SYSTEM_PROMPT } from "@/lib/data";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const contents = [
      {
        role: "user",
        parts: [{ text: SYSTEM_PROMPT }],
      },
      ...messages.map((m: any) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      })),
    ];

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": process.env.GOOGLE_GENERATIVE_AI_API_KEY!,
        },
        body: JSON.stringify({ contents }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API error:", data);

      return new Response("API error from Gemini.", {
        status: 500,
        headers: { "Content-Type": "text/plain" },
      });
    }

    const text =
      data?.candidates?.[0]?.content?.parts
        ?.map((p: any) => p?.text)
        ?.filter(Boolean)
        ?.join("") || "No response from AI.";

    
    return new Response(text, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  } catch (err) {
    console.error("Route error:", err);

    return new Response("Server error occurred.", {
      status: 500,
      headers: { "Content-Type": "text/plain" },
    });
  }
}
