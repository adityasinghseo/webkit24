import { GoogleGenerativeAI } from "@google/generative-ai";

async function testModel(modelName: string) {
    const key = process.env.GEMINI_API_KEY || "AIzaSyDBwpmn9x0xZ9Vil1H55abhfNiUEidgoz4";
    console.log(`Testing model: ${modelName} with key ending in: ...${key.slice(-4)}`);

    const genAI = new GoogleGenerativeAI(key);
    const model = genAI.getGenerativeModel({ model: modelName });

    try {
        const result = await model.generateContent("SaaS");
        const response = await result.response;
        console.log(`SUCCESS [${modelName}]:`, response.text());
    } catch (err: any) {
        console.error(`FAILED [${modelName}]:`, err.message || err);
    }
}

async function run() {
    await testModel("gemini-1.5-flash");
    await testModel("gemini-2.0-flash-exp");
}

run();
