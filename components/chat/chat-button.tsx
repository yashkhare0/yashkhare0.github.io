"use client"

import { MessageCircle, X } from "lucide-react"

interface ChatButtonProps {
  isOpen: boolean
  onToggle: () => void
}

export function ChatButton({ isOpen, onToggle }: ChatButtonProps) {
  return (
    <button
      onClick={onToggle}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95"
      style={{
        background: "var(--accent-gold)",
        color: "var(--text-inverse)",
        boxShadow: "0 4px 20px rgba(212, 168, 67, 0.3)",
      }}
      aria-label={isOpen ? "Close chat" : "Chat with Yash"}
    >
      {isOpen ? <X size={20} /> : <MessageCircle size={20} />}
    </button>
  )
}
