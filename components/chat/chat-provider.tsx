"use client"

import { useState } from "react"
import { ChatButton } from "./chat-button"
import { ChatWidget } from "./chat-widget"

export function ChatProvider() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <ChatWidget isOpen={isOpen} />
      <ChatButton isOpen={isOpen} onToggle={() => setIsOpen((o) => !o)} />
    </>
  )
}
