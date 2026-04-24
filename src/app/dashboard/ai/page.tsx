"use client"

import { useEffect, useState } from "react"
import { useAIStore, AIProvider } from "@/store/use-ai-store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { ShieldAlert } from "lucide-react"

export default function AIPage() {
  const [isMounted, setIsMounted] = useState(false)
  const store = useAIStore()

  // Local state for the form so we don't save per keystroke
  const [provider, setProvider] = useState<AIProvider>("openai")
  const [model, setModel] = useState("")
  const [baseUrl, setBaseUrl] = useState("")
  const [apiKey, setApiKey] = useState("")

  useEffect(() => {
    // Hydration check + load initial data
    setIsMounted(true)
    setProvider(store.provider)
    setModel(store.model)
    setBaseUrl(store.baseUrl)
    setApiKey(store.apiKey)
  }, [store])

  if (!isMounted) return null // Avoid hydration mismatch on initial render

  const handleSave = () => {
    store.setProvider(provider)
    store.setModel(model)
    store.setBaseUrl(baseUrl)
    store.setApiKey(apiKey)
    toast.success("AI API configuration securely saved to local storage!")
  }

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Settings</h1>
        <p className="text-muted-foreground mt-2">Configure your preferred LLM provider for the resume generation suite.</p>
      </div>

      <div className="bg-yellow-500/10 p-4 rounded-xl border border-yellow-500/20 flex gap-3 text-sm text-yellow-600 dark:text-yellow-500">
         <ShieldAlert className="w-5 h-5 shrink-0" />
         <p>
           <strong>Privacy Notice:</strong> Your API keys are strictly saved in your browser's local storage and are <strong>never</strong> transmitted to our database. All LLM requests are proxied securely or made directly from your client.
         </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>API Configuration</CardTitle>
          <CardDescription>These details are required for the AI to function properly.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="provider">Provider</Label>
              <Select value={provider} onValueChange={(v) => {
                setProvider(v as AIProvider)
                if (v === 'openai' && !model) setModel('gpt-4o')
                if (v === 'anthropic' && !model) setModel('claude-3-opus-20240229')
                if (v === 'openrouter' && !model) setModel('google/gemini-2.5-flash')
              }}>
                <SelectTrigger id="provider">
                  <SelectValue placeholder="Select provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="openai">OpenAI</SelectItem>
                  <SelectItem value="anthropic">Anthropic</SelectItem>
                  <SelectItem value="gemini">Google Gemini</SelectItem>
                  <SelectItem value="openrouter">OpenRouter</SelectItem>
                  <SelectItem value="custom">Custom / Local</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="model">Model ID</Label>
              <Input 
                id="model" 
                value={model} 
                onChange={(e) => setModel(e.target.value)} 
                placeholder="gpt-4o, claude-3-opus..." 
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="baseUrl">Base URL <span className="text-muted-foreground font-normal">(Optional)</span></Label>
            <Input 
              id="baseUrl" 
              value={baseUrl} 
              onChange={(e) => setBaseUrl(e.target.value)} 
              placeholder="e.g. https://api.openai.com/v1" 
            />
            <p className="text-xs text-muted-foreground">Useful for custom endpoints, proxies, or local models (Ollama).</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="apiKey">API Key <span className="text-muted-foreground font-normal">(Optional if set in .env)</span></Label>
            <Input 
              id="apiKey" 
              type="password" 
              value={apiKey} 
              onChange={(e) => setApiKey(e.target.value)} 
              placeholder="sk-..." 
            />
            <p className="text-xs text-muted-foreground">If left blank, the application will fallback to your secure backend <code>.env</code> file keys automatically.</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2 bg-muted/20 items-center rounded-b-xl pt-6">
           <Button variant="ghost" onClick={() => {
              store.reset()
              toast.info("Keys purged from local storage.")
           }}>Clear Keys</Button>
           <Button onClick={handleSave}>Save Keys</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
