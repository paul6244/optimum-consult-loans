'use client'

import { useState } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { Bot, MessageCircle, Phone, RotateCcw, Send, ShieldCheck, Sparkles, X } from 'lucide-react'

const starters = ['How does consolidation work?', 'What documents do I need?', 'Can I qualify with existing loans?']

export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const { messages, sendMessage, status, error, setMessages } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  })
  const busy = status === 'submitted' || status === 'streaming'

  function submit(text: string) {
    const clean = text.trim()
    if (!clean || busy) return
    sendMessage({ text: clean })
    setInput('')
  }

  function startNewChat() {
    setMessages([])
  }

  return (
    <div className="chat-widget">
      {open && (
        <section className="chat-panel" aria-label="Paul chat assistant">
          <div className="chat-header">
            <div className="chat-avatar"><Bot size={18} /></div>
            <div><strong>Paul</strong><span><i /> AI assistant</span></div>
            <div className="chat-header-actions">
              <a href="tel:0257859442" className="chat-call" aria-label="Call us" title="Call us"><Phone size={16} /></a>
              {messages.length > 0 && <button className="chat-new-chat" onClick={startNewChat} aria-label="Start new chat" title="New chat"><RotateCcw size={16} /></button>}
              <button className="chat-close" onClick={() => setOpen(false)} aria-label="Close chat"><X size={18} /></button>
            </div>
          </div>
          <div className="chat-messages" aria-live="polite">
            {messages.length === 0 && <div className="chat-welcome"><div className="welcome-icon"><Sparkles size={18} /></div><p>Hello! I'm Paul, your AI assistant for Optimum Consult LTD. How can I assist you today? Are you a CAGD worker in Ghana looking for financial guidance or help with loan consolidation?</p><div className="starter-list">{starters.map(starter => <button key={starter} onClick={() => submit(starter)}>{starter}</button>)}</div></div>}
            {messages.map(message => <div className={message.role === 'user' ? 'chat-message user' : 'chat-message assistant'} key={message.id}>{message.parts.map((part, index) => part.type === 'text' ? <span key={index}>{part.text}</span> : null)}</div>)}
            {busy && <div className="chat-message assistant typing"><span /><span /><span /></div>}
            {error && <div className="chat-error">Something went wrong. Please try again or speak with a consultant.</div>}
          </div>
          <form className="chat-form" onSubmit={event => { event.preventDefault(); submit(input) }}>
            <input value={input} onChange={event => setInput(event.target.value)} placeholder="Type your question..." aria-label="Type your question" disabled={busy} />
            <button type="submit" aria-label="Send message" disabled={!input.trim() || busy}><Send size={17} /></button>
          </form>
          <div className="chat-disclaimer"><ShieldCheck size={13} /> General guidance only · Your privacy matters</div>
        </section>
      )}
      <button className={open ? 'chat-launcher is-open' : 'chat-launcher'} onClick={() => setOpen(!open)} aria-label={open ? 'Close chat assistant' : 'Open chat assistant'}>{open ? <X size={22} /> : <MessageCircle size={22} />} {!open && <span>Questions? Chat with us</span>}</button>
    </div>
  )
}
