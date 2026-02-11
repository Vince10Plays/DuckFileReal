
import { GoogleGenAI } from "@google/genai";

export const analyzeFile = async (file: Blob, fileName: string, mimeType: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // For text files, we read the content. For others, we might describe the metadata or look at the first frame (if we had a way to extract it easily)
    // Here we'll handle text-based analysis and simple image analysis if applicable.
    
    const isImage = mimeType.startsWith('image/');
    const isText = mimeType.startsWith('text/') || mimeType === 'application/pdf';

    const reader = new FileReader();
    const fileBase64Promise = new Promise<string>((resolve) => {
      reader.onloadend = () => {
        const base64 = (reader.result as string).split(',')[1];
        resolve(base64);
      };
      reader.readAsDataURL(file);
    });

    const fileBase64 = await fileBase64Promise;

    const prompt = isImage 
      ? `Explain what is in this image titled "${fileName}". Provide a short, fun summary.`
      : `Analyze the following file content from "${fileName}" and provide a concise summary or description. If it's a non-text binary file, explain what it likely is based on the name and type.`;

    const response = await ai.models.generateContent({
      model: isImage ? 'gemini-3-flash-preview' : 'gemini-3-flash-preview',
      contents: {
        parts: [
          { inlineData: { data: fileBase64, mimeType: mimeType.startsWith('image/') ? mimeType : 'application/pdf' } },
          { text: prompt }
        ]
      }
    });

    return response.text || "I couldn't analyze this file, but it looks important!";
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return "The Duck Assistant is sleeping right now. Try again later!";
  }
};
