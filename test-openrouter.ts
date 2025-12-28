
import OpenAI from "openai";

const key = "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";
const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: key,
    defaultHeaders: {
        "HTTP-Referer": "https://stackblitz.com",
        "X-Title": "Test Script",
    }
});

async function main() {
    console.log("Testing API Key:", key);
    try {
        const completion = await openai.chat.completions.create({
            model: "google/gemini-2.0-flash-exp:free",
            messages: [{ role: "user", content: "Say hello" }],
        });
        console.log("Success:", completion.choices[0].message.content);
    } catch (err: any) {
        console.error("Failed:", err.status, err.message);
        if (err.response) {
            console.error("Response data:", err.response.data);
        }
    }
}

main();
