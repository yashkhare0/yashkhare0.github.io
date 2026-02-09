"use client"

/// <reference types="react" />
import React, { useState, useRef, useEffect, useCallback } from "react"
import { gsap } from "gsap"
import { Send, AlertCircle, Mail } from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
}

interface ChatWidgetProps {
  isOpen: boolean
}

const SYSTEM_PROMPT = `You are an AI chatbot on Yash Khare's portfolio website. You speak as Yash in first person — casually, directly, and with personality. But you are NOT actually Yash. You are an AI he built for fun on his portfolio.

## Who Yash Is
- Name: Yash Khare
- Title: AI Software Engineer
- Location: Berlin, Germany
- Email: yash.khare.work@gmail.com
- Website: https://yashkhare0.github.io
- GitHub: https://github.com/yashkhare0
- LinkedIn: https://www.linkedin.com/in/yash-khare/

## About
I ship fast without gambling with quality. For AI products, that means solid foundations: clean APIs, testable pipelines, observable systems, and cost-aware deployments. I focus on turning LLM/ML capabilities into reliable product features, aligning with stakeholders, and building platforms that let teams ship repeatedly. Based in Berlin, I work at the intersection of AI engineering and scalable product development. With a Master's from ESCP Europe (GMAT 730, 96th percentile), I combine deep technical execution with business acumen. I've co-founded an AI startup, led remote teams across time zones, and generated six-figure revenues within months of launch.

## Current Role
AI Software Engineer at COSMO CONSULT, Berlin (Apr 2025 - Present).
- Developed, shipped and maintain 8 products end-to-end in 8 months with avg time-to-deployment < 3 weeks
- Architected Sonar (company's most important internal AI platform): live transcript ingestion and custom analysis
- Built Translate (COSMO's highest adopted internal platform of 2025) reaching 25% usage without any marketing
- Tech: Next.js, Vercel, FastAPI, PostgreSQL, PGVector, Django, Neo4j, Azure, RabbitMQ, Pulumi, PostHog, WorkOS

## Previous Experience
- GEM AI (Co-Founder & AI Engineer, Paris, Jan 2024 - Jan 2025): Built Echo (enterprise RAG, EUR 125K revenue first month), Snap-and-Solve (multi-LLM solver, 25 days), Adaptive Syllabus Mapper. Scaled to 10 developers, EUR 175K+ revenue in 6 months.
- Pernod Ricard (UX Researcher, Paris, Jul-Dec 2023): Automated data reporting with Python, conducted user research, converted internship into founding own venture.
- Passionoid Technologies & Bliip Studios (Co-Founder & Software Engineer, Pune, India, 2019-2022): Led team of 5, delivered 16+ projects for national and international clients.

## Education
Masters in Management (Innovation & High Tech), ESCP Europe Business School, Berlin (2022-2025). GMAT: 730 (96th percentile).

## Key Projects
- noll.to (Featured): Privacy-first document translation SaaS. Layout retention, controlled data handling. https://noll.to
- testkizuna.com: AI-assisted QA and testing. https://testkizuna.com
- Sonar AI Platform: Internal AI platform for live transcript ingestion. https://sonar.apx.team
- Cosma: AI business assistant. https://cosma.app
- Radar: Internal intelligence tool for market signals. https://radar.apx.team
- Translate: COSMO's most adopted internal platform. https://translate.apx.team
- Voko: Interactive CLI for i18n in JS/TS. Open source, on npm. https://yashkhare0.github.io/voko/ | https://github.com/yashkhare0/voko
- Echo: Enterprise RAG tool, EUR 125K revenue first month.
- Snap-and-Solve: Multi-LLM problem solver, built in 25 days.
- Adaptive Syllabus Mapper: Learning path engine using knowledge graphs.

## Tech Stack
AI/LLM: RAG, Semantic Search, Prompt Engineering, Eval Patterns, Hugging Face, Transformers, Ollama, vLLM, LangChain, LlamaIndex
ML/Data: Pandas, NumPy, scikit-learn, PyTorch, TensorFlow
Backend: Python, FastAPI, Django, REST APIs, Async Python, Testing
Infra: PostgreSQL, Redis, Neo4j, PGVector, RabbitMQ, Docker, Kubernetes, CI/CD, Azure, Monitoring, Pulumi, PostHog
Frontend: React, Next.js, TypeScript, Tailwind CSS, React Native, Flutter

## Languages
English (Native), Hindi (Native), French (B1), German (A1)

## Communication Style
- Direct and concise. No fluff, no filler.
- Confident without being arrogant.
- Technical but approachable — can explain complex concepts simply.
- Uses concrete metrics (revenue numbers, team sizes, deployment timelines).
- Gets straight to the point. Short sentences preferred.
- Occasionally casual and friendly. Not robotic.
- When asked about tech, gives specific stack details and real numbers.
- Enthusiastic about AI, building products, and shipping fast.

## Rules
1. Answer in first person as Yash, but never claim to actually BE Yash — you're an AI chatbot on his portfolio.
2. Only share information provided above. Do NOT invent projects, companies, dates, or numbers.
3. Do NOT share the phone number.
4. Do NOT pretend to schedule meetings, calls, or access calendars.
5. Do NOT give opinions on politics, religion, or controversial topics.
6. If unsure about something, say so and suggest they email yash.khare.work@gmail.com.
7. Keep responses concise — 2-4 sentences for simple questions, a bit more for detailed technical questions.
8. If someone asks about something not covered in the provided info, be honest: "I don't have info on that, but you can reach me at yash.khare.work@gmail.com."
9. Be friendly and engaging. You want people to leave the chat with a good impression.`

const MAX_MESSAGES = 20
const MODEL = "openai/gpt-oss-120b:free"

export function ChatWidget({ isOpen }: ChatWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [userMessageCount, setUserMessageCount] = useState(0)
  const panelRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Animate panel open/close
  useEffect(() => {
    if (!panelRef.current) return

    if (isOpen) {
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, y: 20, scale: 0.95, pointerEvents: "none" },
        { opacity: 1, y: 0, scale: 1, pointerEvents: "auto", duration: 0.35, ease: "power3.out" }
      )
      // Focus input after animation
      setTimeout(() => inputRef.current?.focus(), 350)
    } else {
      gsap.to(panelRef.current, {
        opacity: 0, y: 20, scale: 0.95, pointerEvents: "none", duration: 0.25, ease: "power3.in",
      })
    }
  }, [isOpen])

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const sendMessage = useCallback(async () => {
    const trimmed = input.trim()
    if (!trimmed || isLoading) return

    if (userMessageCount >= MAX_MESSAGES) {
      setError("limit")
      return
    }

    const apiKey = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY
    if (!apiKey) {
      setError("no_key")
      return
    }

    const userMessage: Message = { role: "user", content: trimmed }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput("")
    setIsLoading(true)
    setError(null)
    setUserMessageCount((c: number) => c + 1)

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://yashkhare0.github.io",
          "X-Title": "Yash Khare Portfolio",
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...updatedMessages,
          ],
          stream: true,
          max_tokens: 500,
        }),
      })

      if (response.status === 429) {
        setError("rate_limit")
        setIsLoading(false)
        return
      }

      if (!response.ok) {
        setError("api_error")
        setIsLoading(false)
        return
      }

      // Streaming response
      const reader = response.body?.getReader()
      if (!reader) {
        setError("api_error")
        setIsLoading(false)
        return
      }

      const decoder = new TextDecoder()
      let assistantContent = ""

      // Add empty assistant message to start streaming into
      setMessages((prev: Message[]) => [...prev, { role: "assistant", content: "" }])

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split("\n")

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6).trim()
            if (data === "[DONE]") break

            try {
              const parsed = JSON.parse(data)
              const delta = parsed.choices?.[0]?.delta?.content
              if (delta) {
                assistantContent += delta
                const currentContent = assistantContent
                setMessages((prev: Message[]) => {
                  const updated = [...prev]
                  updated[updated.length - 1] = { role: "assistant", content: currentContent }
                  return updated
                })
              }
            } catch {
              // Skip malformed JSON chunks
            }
          }
        }
      }
    } catch {
      setError("network")
    } finally {
      setIsLoading(false)
    }
  }, [input, isLoading, messages, userMessageCount])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const limitReached = userMessageCount >= MAX_MESSAGES

  return (
    <div
      ref={panelRef}
      className="fixed bottom-20 right-4 sm:right-6 z-50 opacity-0 pointer-events-none"
      style={{ width: "min(380px, calc(100vw - 2rem))" }}
    >
      <div
        className="rounded-xl border overflow-hidden flex flex-col"
        style={{
          background: "var(--bg-elevated)",
          borderColor: "var(--border-default)",
          height: "min(500px, calc(100vh - 8rem))",
          boxShadow: "var(--shadow-lg)",
        }}
      >
        {/* Header */}
        <div
          className="px-4 py-3 border-b flex items-center justify-between shrink-0"
          style={{ borderColor: "var(--border-subtle)" }}
        >
          <div>
            <h3 className="font-display text-sm font-semibold">Chat with Yash</h3>
          </div>
          <div
            className="w-2 h-2 rounded-full"
            style={{ background: "var(--accent-gold)", boxShadow: "0 0 8px var(--accent-gold-glow)" }}
          />
        </div>

        {/* Disclaimer */}
        <div
          className="px-4 py-2.5 text-[11px] leading-relaxed shrink-0 border-b"
          style={{
            background: "var(--accent-gold-muted)",
            color: "var(--text-secondary)",
            borderColor: "var(--border-subtle)",
          }}
        >
          This is an AI chatbot I built for fun — not actually me, not a representative.
          If it says something weird,{" "}
          <a
            href="https://www.linkedin.com/in/yash-khare/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-medium"
            style={{ color: "var(--accent-gold)" }}
          >
            connect on LinkedIn
          </a>.
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ minHeight: 0 }}>
          {messages.length === 0 && !isLoading && (
            <div className="text-center py-8">
              <p className="font-body text-sm mb-2" style={{ color: "var(--text-secondary)" }}>
                Hey! Ask me anything about my work, tech stack, or projects.
              </p>
              <p className="font-mono text-[11px]" style={{ color: "var(--text-tertiary)" }}>
                Try: &quot;What are you working on?&quot;
              </p>
            </div>
          )}

          {messages.map((msg: Message, i: number) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className="max-w-[85%] px-3.5 py-2.5 rounded-xl font-body text-sm leading-relaxed"
                style={{
                  background: msg.role === "user" ? "var(--accent-gold)" : "var(--bg-surface)",
                  color: msg.role === "user" ? "var(--text-inverse)" : "var(--text-primary)",
                  borderBottomRightRadius: msg.role === "user" ? "4px" : undefined,
                  borderBottomLeftRadius: msg.role === "assistant" ? "4px" : undefined,
                }}
              >
                {msg.content || (
                  <span className="inline-flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: "var(--text-tertiary)", animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: "var(--text-tertiary)", animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: "var(--text-tertiary)", animationDelay: "300ms" }} />
                  </span>
                )}
              </div>
            </div>
          ))}

          {/* Error states */}
          {error === "rate_limit" && (
            <div
              className="flex items-start gap-2 p-3 rounded-lg border"
              style={{ background: "var(--bg-surface)", borderColor: "var(--border-subtle)" }}
            >
              <AlertCircle size={14} className="shrink-0 mt-0.5" style={{ color: "var(--accent-warm)" }} />
              <div>
                <p className="font-body text-xs" style={{ color: "var(--text-secondary)" }}>
                  The chatbot has reached its daily limit.
                </p>
                <a
                  href="mailto:yash.khare.work@gmail.com"
                  className="inline-flex items-center gap-1 font-body text-xs mt-1"
                  style={{ color: "var(--accent-gold)" }}
                >
                  <Mail size={11} /> Email me instead
                </a>
              </div>
            </div>
          )}

          {error === "limit" && (
            <div
              className="flex items-start gap-2 p-3 rounded-lg border"
              style={{ background: "var(--bg-surface)", borderColor: "var(--border-subtle)" }}
            >
              <AlertCircle size={14} className="shrink-0 mt-0.5" style={{ color: "var(--accent-warm)" }} />
              <div>
                <p className="font-body text-xs" style={{ color: "var(--text-secondary)" }}>
                  You&apos;ve hit the {MAX_MESSAGES}-message limit for this session.
                </p>
                <a
                  href="mailto:yash.khare.work@gmail.com"
                  className="inline-flex items-center gap-1 font-body text-xs mt-1"
                  style={{ color: "var(--accent-gold)" }}
                >
                  <Mail size={11} /> Continue via email
                </a>
              </div>
            </div>
          )}

          {(error === "api_error" || error === "network" || error === "no_key") && (
            <div
              className="flex items-start gap-2 p-3 rounded-lg border"
              style={{ background: "var(--bg-surface)", borderColor: "var(--border-subtle)" }}
            >
              <AlertCircle size={14} className="shrink-0 mt-0.5" style={{ color: "var(--accent-warm)" }} />
              <p className="font-body text-xs" style={{ color: "var(--text-secondary)" }}>
                Something went wrong. Try again or{" "}
                <a href="mailto:yash.khare.work@gmail.com" style={{ color: "var(--accent-gold)" }}>
                  email me directly
                </a>.
              </p>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div
          className="px-4 py-3 border-t flex items-center gap-2 shrink-0"
          style={{ borderColor: "var(--border-subtle)" }}
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={limitReached ? "Message limit reached" : "Ask me anything..."}
            disabled={isLoading || limitReached}
            className="flex-1 bg-transparent font-body text-sm outline-none placeholder:text-[var(--text-tertiary)] disabled:opacity-50"
            style={{ color: "var(--text-primary)" }}
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !input.trim() || limitReached}
            aria-label="Send message"
            className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105"
            style={{
              background: "var(--accent-gold)",
              color: "var(--text-inverse)",
            }}
          >
            <Send size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}
