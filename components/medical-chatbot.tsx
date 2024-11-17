'use client'

import { useState } from 'react'
import { useChat } from 'ai/react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Stethoscope, Send, Bot, User, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'

export default function MedicalChatbot() {
  const { messages, input, handleInputChange, handleSubmit, error } = useChat()
  const [isTyping, setIsTyping] = useState(false)

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsTyping(true)
    try {
      await handleSubmit(e)
    } catch (error) {
      console.error('Chat error:', error)
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center"
    >
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="bg-primary text-primary-foreground">
          <CardTitle className="text-2xl flex items-center gap-2">
            <Stethoscope className="w-6 h-6" />
            Medical AI Assistant
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <ScrollArea className="h-[500px] pr-4">
            {messages.map(m => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex gap-3 mb-4 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.role === 'assistant' && <Bot className="w-6 h-6 mt-1 text-primary" />}
                <div className={`rounded-lg p-3 max-w-[80%] ${
                  m.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                }`}>
                  {m.content}
                </div>
                {m.role === 'user' && <User className="w-6 h-6 mt-1 text-primary" />}
              </motion.div>
            ))}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex gap-3 mb-4"
              >
                <Bot className="w-6 h-6 mt-1 text-primary" />
                <div className="rounded-lg p-3 bg-muted">
                  <span className="animate-pulse">Typing...</span>
                </div>
              </motion.div>
            )}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex gap-3 mb-4 text-destructive"
              >
                <AlertCircle className="w-6 h-6 mt-1" />
                <div className="rounded-lg p-3 bg-destructive/10">
                  Error: {error.message}
                </div>
              </motion.div>
            )}
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <form onSubmit={handleFormSubmit} className="flex w-full gap-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Ask a medical question..."
              className="flex-grow"
            />
            <Button type="submit" disabled={isTyping}>
              <Send className="w-4 h-4 mr-2" />
              Send
            </Button>
          </form>
        </CardFooter>
      </Card>
    </motion.div>
  )
}