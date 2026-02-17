
import { GoogleGenAI } from "@google/genai";
import * as dotenv from 'dotenv';
dotenv.config();

async function listModels() {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        // Note: The SDK might expose listModels differently, let's try the standard way or handle error
        // Based on SDK docs (or general knowledge), usually it's under models or a specific client
        // For @google/genai (new SDK), it might be different. Let's try to infer or use a simple generate to test.
        // Actually, the error message said "CALL LISTMODELS".
        // Let's try to find the method on the `ai.models` object.

        console.log("Attempting to list models...");
        const result = await ai.models.list();

        // Iterate if it's an async iterable or just print property
        for await (const model of result) {
            console.log(`Model: ${model.name}`);
            console.log(`- Supported generation methods: ${model.supportedActions}`);
        }

    } catch (error) {
        console.error("Error listing models:", error);
    }
}

listModels();
