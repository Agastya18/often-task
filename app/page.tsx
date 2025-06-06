'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Rocket } from 'lucide-react'

export default function Home() {
  const router = useRouter()
  
  return (
    <main className="container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-5xl font-bold mb-6 text-white">AI Travel Platform</h1>
      <p className="text-xl mb-10 text-white/80 max-w-2xl">
        Create stunning event invites for your travel experiences with our AI-powered platform.
        Customize themes, set details, and share your adventures with the world.
      </p>
      
      <Button 
        size="lg" 
        onClick={() => router.push('/create')}
        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium px-8 py-6 text-lg rounded-full"
      >
        <Rocket className="mr-2 h-5 w-5" />
        Create New Invite
      </Button>
    </main>
  )
}