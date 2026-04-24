"use server"

import { getAIConfig } from "@/lib/ai-helper"
import { AIProvider } from "@/store/use-ai-store"

export async function analyzeResumeWithAI(
  resumeText: string,
  clientConfig: { provider: AIProvider; model: string; baseUrl: string; apiKey: string }
) {
  try {
    const config = getAIConfig(clientConfig)
    
    const systemPrompt = `You are an expert Applicant Tracking System (ATS) and Senior Technical Recruiter.
Evaluate the provided resume content. Be strict and constructive.
Return a valid JSON object strictly matching this schema:
{
  "score": number, // an ATS compatibility score from 0 to 100
  "summary": string, // 1 sentence overall feedback
  "suggestions": string[] // Exactly 3 actionable suggestions to improve the ATS score
}
Do not return any markdown wrappers, just the raw JSON.`

    const payload = {
      model: config.model,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Here is the resume parsed text:\n\n${resumeText}` }
      ],
      temperature: 0.3
    }

    const response = await fetch(`${config.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${config.apiKey}`
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      const errorText = await response.text()
      if (response.status === 503) {
        throw new Error("AI service is currently unavailable (503). Please try again in a few minutes.")
      }
      throw new Error(`AI Request Failed: ${response.status} ${errorText}`)
    }

    const data = await response.json()
    
    if (data.error) throw new Error(data.error.message || "AI Error")
    
    if (!data.choices?.[0]?.message?.content) {
      throw new Error("AI returned an empty or invalid content format.")
    }
    
    let content = data.choices[0].message.content.trim()
    if (content.startsWith("```")) {
      content = content.replace(/^```json\n?/, "").replace(/n?```$/, "").trim()
    }

    const parsed = JSON.parse(content)
    
    if (typeof parsed.score !== "number" || !Array.isArray(parsed.suggestions)) {
      throw new Error("Invalid response format from AI.")
    }

    return { success: true, result: parsed }
  } catch (error: any) {
    console.error("AI Analysis Error:", error)
    return { success: false, error: error.message }
  }
}

/**
 * Specifically for extracting structured resume data from raw text.
 */
export async function extractResumeDataWithAI(
  rawText: string,
  clientConfig: { provider: AIProvider; model: string; baseUrl: string; apiKey: string }
) {
  try {
    const config = getAIConfig(clientConfig)
    
    const systemPrompt = `You are a strict data-extraction engine.
I will pass you a block of text extracted from a resume. 
Extract everything intelligently into the standard JSON Resume structure.

Output strictly valid JSON matching this structure:
{
  "basics": {
    "name": string,
    "label": string,
    "email": string,
    "phone": string,
    "url": string,
    "summary": string,
    "location": { "city": string, "region": string, "countryCode": string },
    "profiles": [{ "network": string, "username": string, "url": string }]
  },
  "work": [{
    "name": string,
    "position": string,
    "url": string,
    "startDate": string,
    "endDate": string,
    "summary": string,
    "highlights": string[]
  }],
  "education": [{
    "institution": string,
    "area": string,
    "studyType": string,
    "startDate": string,
    "endDate": string,
    "courses": string[]
  }],
  "skills": [{ "name": string, "keywords": string[] }],
  "languages": [{ "language": string, "fluency": string }],
  "projects": [{
    "name": string,
    "description": string,
    "highlights": string[],
    "url": string
  }]
}

Dates should be strings (e.g. "Aug 2018", "Present").
Map the data as accurately as possible. Ignore layout artifacts.
Do NOT output markdown wrappers like \`\`\`json. Output ONLY the raw JSON object.`

    const payload = {
      model: config.model,
      messages: [
        { role: "system", content: systemPrompt },
        { 
          role: "user", 
          content: `Here is the extracted resume text:\n\n${rawText}`
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.1
    }

    const response = await fetch(`${config.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${config.apiKey}`
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      const errorText = await response.text()
      if (response.status === 503) {
        throw new Error("AI service is currently unavailable (503). This usually means the provider is overloaded or undergoing maintenance. Please try again later.")
      }
      throw new Error(`AI Request Failed: ${response.status} ${errorText}`)
    }

    const jsonRes = await response.json()
    if (jsonRes.error) throw new Error(jsonRes.error.message || "AI Error")

    if (!jsonRes.choices?.[0]?.message?.content) {
      throw new Error("AI returned an empty or invalid content format.")
    }
    
    let content = jsonRes.choices[0].message.content.trim()
    if (content.startsWith("```")) {
      content = content.replace(/^```json\n?/, "").replace(/n?```$/, "").trim()
    }

    const parsedJson = JSON.parse(content)
    return { success: true, json: parsedJson }
  } catch (error: any) {
    console.error("AI Text Extraction Error:", error)
    return { success: false, error: error.message }
  }
}
