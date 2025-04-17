const VIDYUT_INFO = `
Vidyut '25 is India's Largest Inter-Collegiate Multifest, hosted by Amrita Vishwa Vidyapeetham, Amritapuri Campus, happening on May 23rd, 24th, and 25th, 2025.

It is a fully student-driven initiative that began in 2012 and has grown to be one of the most prominent college fests in India. Eminent personalities like Sunidhi Chauhan, Karthik, AGAM Band, When Chai Met Toast, Haricharan, Suraj Jagan, and others have performed in previous editions. The fest includes a wide range of events across music, arts, and more, organized by multiple departments of the university.

The university is guided by Sadguru Shri Mata Amritanandamayi Devi (Amma), and located beside the serene backwaters of Amritapuri.
`;

export async function POST(req) {
  const { prompt } = await req.json();

  const moderationCheck = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama3-8b-8192",
      messages: [
        {
          role: "system",
          content: `You are Echo, the official assistant for Vidyut '25. You ONLY answer questions related to Vidyut '25 and politely refuse everything else.

This is the only information you can use:
${VIDYUT_INFO}

If the user asks anything unrelated to the event, respond with:
"I'm here only to help with Vidyut '25-related questions. Please ask me something about the fest!"`
        },
        {
          role: "user",
          content: prompt
        }
      ]
    })
  });

  if (!moderationCheck.ok) {
    const err = await moderationCheck.text();
    return new Response(JSON.stringify({ error: err }), { status: 500 });
  }

  const data = await moderationCheck.json();
  const reply = data.choices?.[0]?.message?.content || "No response";

  return Response.json({ reply });
}
