'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { format } from 'date-fns'
import { useInviteStore } from '@/lib/store'
import { cn } from '@/lib/utils'
import { Calendar, Clock, MapPin } from 'lucide-react'

export default function InvitePreview() {
  const { formData } = useInviteStore()
  
  // Default placeholder if no theme is selected
  const defaultBg = 'linear-gradient(to right, hsl(var(--primary)), hsl(var(--primary-foreground)))'
  const [isLoaded, setIsLoaded] = useState(false)
  
  // Handle video loading
  const videoRef = useRef<HTMLVideoElement>(null)
  
  return (
    <div className="sticky top-10 w-full aspect-[3/4] rounded-xl overflow-hidden shadow-lg">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10"></div>
      
      {formData.theme ? (
        formData.theme.type === 'video' ? (
          // Video background
          <video 
            ref={videoRef}
            src={formData.theme.url}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            onLoadedData={() => setIsLoaded(true)}
          />
        ) : (
          // Image background
          <div className="absolute inset-0">
            <Image 
              src={formData.theme.url}
              alt={formData.theme.name}
              fill
              className={cn(
                "object-cover transition-opacity duration-300",
                isLoaded ? "opacity-100" : "opacity-0"
              )}
              onLoad={() => setIsLoaded(true)}
              priority
              sizes="(max-width: 768px) 100vw, 500px"
            />
          </div>
        )
      ) : (
        // Default background when no theme is selected
        <div 
          className="absolute inset-0" 
          style={{ background: defaultBg }}
        ></div>
      )}

      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col p-6">
        {/* Event Name */}
        <div className="mt-auto">
          <h2 className="text-3xl font-bold text-white leading-tight mb-4">
            {formData.eventName || "Event Name"}
          </h2>
          
          {/* Date & Time */}
          {formData.startDate && (
            <div className="flex items-center text-white/90 mb-2">
              <Calendar className="h-4 w-4 mr-2" />
              <span>
                {format(formData.startDate, "EEE, MMM dd")}
                {formData.startTime ? ` · ${formData.startTime}` : ""}
                {formData.endTime ? ` - ${formData.endTime}` : ""}
              </span>
            </div>
          )}
          
          {/* Location */}
          {formData.location && (
            <div className="flex items-center text-white/90 mb-3">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{formData.location}</span>
            </div>
          )}
          
          {/* Description */}
          {formData.description && (
            <p className="text-white/80 text-sm mb-4 line-clamp-3">
              {formData.description}
            </p>
          )}
          
          {/* Capacity & Approval */}
          <div className="flex items-center gap-2 text-xs text-white/70">
            {formData.capacity && <span>{formData.capacity} capacity</span>}
            {formData.requireApproval && <span>• Approval required</span>}
          </div>
        </div>
      </div>
    </div>
  )
}