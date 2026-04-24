"use client"

import * as React from "react"
import { Zap, Target, Loader2, Sparkles } from "lucide-react"
import { useBuilder } from "@/app/dashboard/resumes/[id]/builder-context"
import { useAIStore } from "@/store/use-ai-store"
import { Button } from "@/components/ui/button"
import { analyzeResumeWithAI } from "@/app/dashboard/ai/ai-actions"
import { toast } from "sonner"
import { ResumeData } from "@/types/resume"

function extractResumeText(data: ResumeData): string {
  const parts = []
  parts.push(`Name: ${data.basics.name}`)
  parts.push(`Headline: ${data.basics.headline}`)
  parts.push(`Summary: ${(data.sections.summary?.content || "").replace(/<[^>]*>?/gm, '')}`)
  
  parts.push(`\nEXPERIENCE:`)
  data.sections.experience.forEach(e => {
    parts.push(`- ${e.position} at ${e.company} (${e.startDate} - ${e.endDate || 'Present'})`)
    parts.push(`  ${(e.description || "").replace(/<[^>]*>?/gm, '')}`)
  })

  parts.push(`\nEDUCATION:`)
  data.sections.education.forEach(e => {
    parts.push(`- ${e.degree} in ${e.areaOfStudy} at ${e.school}`)
  })
  
  parts.push(`\nSKILLS:`)
  parts.push(data.sections.skills.map(s => s.name).join(", "))
  
  return parts.join("\n")
}

export function AnalysisSection() {
  const { data } = useBuilder()
  const aiStore = useAIStore()
  
  const [isAnalyzing, setIsAnalyzing] = React.useState(false)
  const [result, setResult] = React.useState<{score: number, summary: string, suggestions: string[]} | null>(null)

  const handleAnalyze = async () => {
    setIsAnalyzing(true)
    const textContext = extractResumeText(data)
    
    const response = await analyzeResumeWithAI(textContext, {
      provider: aiStore.provider,
      model: aiStore.model,
      baseUrl: aiStore.baseUrl,
      apiKey: aiStore.apiKey
    })

    if (response.success && response.result) {
      setResult(response.result)
      toast.success("Analysis complete!")
    } else {
      toast.error(response.error || "Failed to analyze resume.")
    }
    setIsAnalyzing(false)
  }

  const scoreColor = !result ? "text-blue-600" : result.score > 80 ? "text-green-600" : result.score > 60 ? "text-amber-500" : "text-red-500"
  const scoreBg = !result ? "bg-blue-50 border-blue-100" : result.score > 80 ? "bg-green-50 border-green-100" : result.score > 60 ? "bg-amber-50 border-amber-100" : "bg-red-50 border-red-100"

  return (
    <div className="space-y-6">
      <div className={`p-5 rounded-xl border ${scoreBg} transition-colors`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Target className={`w-5 h-5 ${scoreColor}`} />
            <h3 className="font-bold text-slate-800">ATS Score</h3>
          </div>
          <Button 
            size="sm" 
            variant="outline" 
            className="h-8 gap-1.5 shadow-sm text-xs bg-white/50 hover:bg-white" 
            onClick={handleAnalyze} 
            disabled={isAnalyzing}
          >
            {isAnalyzing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
            Analyze
          </Button>
        </div>
        
        <div className={`text-4xl font-black mb-2 ${scoreColor}`}>
          {result ? `${result.score}%` : "--%"}
        </div>
        <p className="text-xs text-slate-600 leading-relaxed font-medium">
          {result ? result.summary : "Click Analyze to evaluate your resume against modern ATS criteria."}
        </p>
      </div>

      {result && result.suggestions.length > 0 && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Actionable Suggestions</h4>
          <div className="space-y-2">
            {result.suggestions.map((t, idx) => (
              <div key={idx} className="p-3 bg-muted/40 border rounded-lg text-xs leading-relaxed flex items-start gap-3">
                <Zap className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export function StatisticsSection() {
  const { data } = useBuilder()
  
  const text = extractResumeText(data)
  const charCount = text.length
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length

  // Helper to format numbers (e.g. 1200 -> 1.2k)
  const formatNum = (num: number) => {
    if (num >= 1000) return (num / 1000).toFixed(1) + "k"
    return num.toString()
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 border rounded-xl bg-muted/20">
          <div className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Words</div>
          <div className="text-2xl font-black">{formatNum(wordCount)}</div>
        </div>
        <div className="p-4 border rounded-xl bg-muted/20">
          <div className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Characters</div>
          <div className="text-2xl font-black">{formatNum(charCount)}</div>
        </div>
      </div>
    </div>
  )
}
