import { SYSTEM_PROMPT } from "@/lib/data";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const lastMessage = messages?.[messages.length - 1]?.content;

    if (!lastMessage || typeof lastMessage !== "string") {
      return new Response("Invalid message", { status: 400 });
    }

    const contents = [
      {
        role: "user",
        parts: [
          {
            text: `${SYSTEM_PROMPT}\n\nUser message:\n${lastMessage}`,
          },
        ],
      },
    ];

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": process.env.GOOGLE_GENERATIVE_AI_API_KEY!,
        },
        body: JSON.stringify({
          contents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 512,
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API error:", data);

      if (data?.error?.code === 429) {
        return new Response(
          "⚠️ AI is temporarily busy. Please try again in a minute.",
          { status: 200 }
        );
      }

      return new Response(
        "⚠️ Something went wrong. Please try again.",
        { status: 200 }
      );
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
    console.error("API route crash:", err);

    return new Response("Server error occurred.", {
      status: 500,
    });
  }
}
