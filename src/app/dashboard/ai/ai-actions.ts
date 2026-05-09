"use server"

import { generateObject } from "ai"
import { z } from "zod"
import { getAIModel } from "@/lib/ai-provider"
import { AIProvider } from "@/store/use-ai-store"

interface ClientConfig {
  provider: AIProvider
  model: string
  baseUrl: string
  apiKey: string
}

// --- ATS Analysis ---

const atsResultSchema = z.object({
  score: z.number().min(0).max(100),
  summary: z.string(),
  suggestions: z.array(z.string()).length(3),
})

export async function analyzeResumeWithAI(
  resumeText: string,
  clientConfig: ClientConfig
) {
  try {
    const model = getAIModel(clientConfig)

    const { object } = await generateObject({
      model,
      schema: atsResultSchema,
      system: "You are an expert ATS and Senior Technical Recruiter. Be strict and constructive.",
      prompt: `Evaluate this resume and return an ATS compatibility score, a one-sentence summary, and exactly 3 actionable suggestions.\n\n${resumeText}`,
    })

    return { success: true, result: object }
  } catch (error: any) {
    console.error("AI Analysis Error:", error)
    return { success: false, error: error.message }
  }
}

// --- Resume Extraction ---

const resumeDataSchema = z.object({
  basics: z.object({
    name: z.string(),
    label: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    url: z.string().optional(),
    summary: z.string().optional(),
    location: z.object({
      city: z.string().optional(),
      region: z.string().optional(),
      countryCode: z.string().optional(),
    }).optional(),
    profiles: z.array(z.object({
      network: z.string(),
      username: z.string(),
      url: z.string(),
    })).optional(),
  }),
  work: z.array(z.object({
    name: z.string(),
    position: z.string(),
    url: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    summary: z.string().optional(),
    highlights: z.array(z.string()).optional(),
  })).optional(),
  education: z.array(z.object({
    institution: z.string(),
    area: z.string().optional(),
    studyType: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    courses: z.array(z.string()).optional(),
  })).optional(),
  skills: z.array(z.object({
    name: z.string(),
    keywords: z.array(z.string()).optional(),
  })).optional(),
  languages: z.array(z.object({
    language: z.string(),
    fluency: z.string().optional(),
  })).optional(),
  projects: z.array(z.object({
    name: z.string(),
    description: z.string().optional(),
    highlights: z.array(z.string()).optional(),
    url: z.string().optional(),
  })).optional(),
})

export async function extractResumeDataWithAI(
  rawText: string,
  clientConfig: ClientConfig
) {
  try {
    const model = getAIModel(clientConfig)

    const { object } = await generateObject({
      model,
      schema: resumeDataSchema,
      system: "You are a strict data-extraction engine. Extract resume information into structured data.",
      prompt: `Extract all resume information from this text into structured data. Dates should be strings like "Aug 2018" or "Present".\n\n${rawText}`,
    })

    return { success: true, json: object }
  } catch (error: any) {
    console.error("AI Text Extraction Error:", error)
    return { success: false, error: error.message }
  }
}
