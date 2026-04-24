import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type AIProvider = 'openai' | 'anthropic' | 'gemini' | 'openrouter' | 'custom'

interface AIState {
  provider: AIProvider
  model: string
  baseUrl: string
  apiKey: string
  setProvider: (provider: AIProvider) => void
  setModel: (model: string) => void
  setBaseUrl: (url: string) => void
  setApiKey: (key: string) => void
  reset: () => void
}

const initialState = {
  provider: 'openai' as AIProvider,
  model: 'gpt-4o',
  baseUrl: '',
  apiKey: '',
}

export const useAIStore = create<AIState>()(
  persist(
    (set) => ({
      ...initialState,
      setProvider: (provider) => set({ provider }),
      setModel: (model) => set({ model }),
      setBaseUrl: (baseUrl) => set({ baseUrl }),
      setApiKey: (apiKey) => set({ apiKey }),
      reset: () => set(initialState),
    }),
    {
      name: 'ai-settings-storage', // unique name for localStorage key
    }
  )
)
