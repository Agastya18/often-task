'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Player } from '@remotion/player'
import { useInviteStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Download, Edit } from 'lucide-react'
import InviteVideo from '@/components/remotion/invite-composition'

export default function ViewPage() {
  const router = useRouter()
  const { currentInvite, formData } = useInviteStore()

  // If no current invite, use the form data
  const invite = currentInvite || {
    ...formData,
    id: 'preview',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  
  // If no form data is set, redirect to create page
  useEffect(() => {
    if (!invite.eventName && !invite.theme) {
      router.push('/create')
    }
  }, [invite, router])

  // Handle video download (dummy implementation)
  const handleDownload = () => {
    alert('This would download the video in a real implementation')
  }

  // Check if we have enough data to render
  if (!invite.eventName && !invite.theme) {
    return null // Will redirect via useEffect
  }
  
  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      <div className="flex flex-col items-center">
        <div className="w-full mb-8">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => router.push('/create')}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Edit
            </Button>
            
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={() => router.push('/create')}
                className="text-black border-white/20 hover:bg-white/10"
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit Invite
              </Button>
              
              <Button 
                onClick={handleDownload}
                className="bg-white text-purple-900 hover:bg-white/90"
              >
                <Download className="mr-2 h-4 w-4" />
                Download as Video
              </Button>
            </div>
          </div>
        </div>
        
        {/* Remotion Player */}
        <div className="w-full max-w-lg aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
          <Player
            component={InviteVideo}
            inputProps={{ invite }}
            durationInFrames={300}
            compositionWidth={1080}
            compositionHeight={1440}
            fps={30}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '1rem',
            }}
            controls
          />
        </div>
        
        <div className="mt-8 text-white/70 text-center max-w-md">
          <p>
            This is a preview of your event invite. You can download it as a video
            or make edits as needed. Share this unique invite with your guests!
          </p>
        </div>
      </div>
    </div>
  )
}