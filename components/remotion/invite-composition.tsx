'use client'

import { useEffect, useState } from 'react'
import { AbsoluteFill, useCurrentFrame, spring, useVideoConfig } from 'remotion'
import { format } from 'date-fns'
import { Invite } from '@/types/invite'

interface InviteVideoProps {
  invite: Invite
}

export default function InviteVideo({ invite }: InviteVideoProps) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  
  // Spring animations for smooth entrance
  const titleOpacity = spring({
    frame,
    from: 0,
    to: 1,
    fps,
    durationInFrames: 30,
  })
  
  const contentOpacity = spring({
    frame: frame - 15,
    from: 0,
    to: 1,
    fps,
    durationInFrames: 30,
  })
  
  const detailsOpacity = spring({
    frame: frame - 30,
    from: 0,
    to: 1,
    fps,
    durationInFrames: 30,
  })

  const [videoSrc, setVideoSrc] = useState<string | null>(null)

  // For video backgrounds in real implementation
  useEffect(() => {
    if (invite.theme?.type === 'video') {
      setVideoSrc(invite.theme.url)
    }
  }, [invite.theme])
  
  return (
    <AbsoluteFill style={{ backgroundColor: '#1e1e1e' }}>
      {/* Background */}
      <div style={{ position: 'absolute', inset: 0 }}>
        {invite.theme?.type === 'image' ? (
          <img 
            src={invite.theme.url} 
            alt="Background"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : videoSrc ? (
          <video
            src={videoSrc}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            muted
            autoPlay
            loop
          />
        ) : null}
        
        {/* Overlay gradient */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.8))',
        }} />
      </div>
      
      {/* Content */}
      <AbsoluteFill
        style={{
          padding: 60,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}
      >
        <h1 style={{
          fontSize: 80,
          fontWeight: 'bold',
          color: 'white',
          marginBottom: 20,
          opacity: titleOpacity,
          transform: `translateY(${(1 - titleOpacity) * 20}px)`,
        }}>
          {invite.eventName || "Event Name"}
        </h1>
        
        {invite.startDate && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            color: 'rgba(255, 255, 255, 0.9)',
            marginBottom: 12,
            fontSize: 24,
            opacity: contentOpacity,
            transform: `translateY(${(1 - contentOpacity) * 20}px)`,
          }}>
            <span style={{ marginRight: 12 }}>📅</span>
            <span>
              {format(new Date(invite.startDate), "EEEE, MMMM dd")}
              {invite.startTime ? ` · ${invite.startTime}` : ""}
              {invite.endTime ? ` - ${invite.endTime}` : ""}
            </span>
          </div>
        )}
        
        {invite.location && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            color: 'rgba(255, 255, 255, 0.9)',
            marginBottom: 24,
            fontSize: 24,
            opacity: contentOpacity,
            transform: `translateY(${(1 - contentOpacity) * 20}px)`,
          }}>
            <span style={{ marginRight: 12 }}>📍</span>
            <span>{invite.location}</span>
          </div>
        )}
        
        {invite.description && (
          <p style={{
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: 20,
            marginBottom: 30,
            maxWidth: '80%',
            lineHeight: 1.5,
            opacity: detailsOpacity,
            transform: `translateY(${(1 - detailsOpacity) * 20}px)`,
          }}>
            {invite.description}
          </p>
        )}
        
        <div style={{
          display: 'flex',
          gap: 16,
          marginTop: 20,
          color: 'rgba(255, 255, 255, 0.7)',
          fontSize: 16,
          opacity: detailsOpacity,
        }}>
          {invite.capacity && <span>{invite.capacity} capacity</span>}
          {invite.requireApproval && <span>• Approval required</span>}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  )
}