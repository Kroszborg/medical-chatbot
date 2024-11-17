import MedicalChatbot from '@/components/medical-chatbot'
import { ThemeToggle } from '@/components/theme-toggle'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home } from 'lucide-react'

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <Button asChild variant="outline">
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Home
            </Link>
          </Button>
          <ThemeToggle />
        </div>
        <MedicalChatbot />
      </div>
    </div>
  )
}