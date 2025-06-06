import { NextResponse } from 'next/server'
import { z } from 'zod'
import { Invite } from '@/types/invite'

// Schema for invite creation based on the provided creating.json structure
const inviteSchema = z.object({
  theme: z.object({
    id: z.string(),
    type: z.enum(['image', 'video']),
    url: z.string().url()
  }),
  eventName: z.string().min(1, "Event name is required"),
  startDate: z.string().datetime(),
  endDate: z.string().datetime().optional(),
  location: z.string().optional(),
  description: z.string().optional(),
  capacity: z.string().optional(),
  requireApproval: z.boolean().default(false)
})

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json()
    
    // Validate the request body
    const validatedData = inviteSchema.parse(body)
    
    // In a real implementation, we would save this to a database
    // For now, we'll just return a mocked response based on response.json
    
    const invite: Invite = {
      ...validatedData,
      id: `invite_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      startTime: '12:00', // Default
      endTime: '13:00', // Default
      timezone: 'GMT-05:30',
      tickets: {
        price: 'Free',
        currency: 'USD'
      },
    }
    
    // Return the created invite
    return NextResponse.json({
      status: "success",
      data: invite
    })
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { status: "error", error: error.errors },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { status: "error", error: "Failed to create invite" },
      { status: 500 }
    )
  }
}