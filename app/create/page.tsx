// @ts-nocheck
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { format } from 'date-fns'
import { Calendar as CalendarIcon, Check, Clock, MapPin, Info, Users, TicketIcon, ChevronsUpDown } from 'lucide-react'
import { InviteFormData } from '@/types/invite'
import { useInviteStore } from '@/lib/store'

// UI Components
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import ThemeSelector from '@/components/invite/theme-selector'
import InvitePreview from '@/components/invite/invite-preview'

export default function CreatePage() {
  const router = useRouter()
  const { formData, updateFormData, saveInvite } = useInviteStore()
  
  const { register, handleSubmit, control, watch, setValue, formState } = useForm<InviteFormData>({
    defaultValues: formData
  })

  // Watch for form changes and update store
  const watchedValues = watch()
  
  useEffect(() => {
    if (JSON.stringify(watchedValues) !== JSON.stringify(formData)) {
      updateFormData(watchedValues)
    }
  }, [watchedValues, updateFormData, formData])

  const onSubmit = (data: InviteFormData) => {
    updateFormData(data)
    saveInvite()
    router.push('/view')
  }

  const handlePreview = () => {
    router.push('/view')
  }
  
  return (
    <div className="container mx-auto py-10 px-4 max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left column - Preview */}
        <div className="md:col-span-5 lg:col-span-4">
          <InvitePreview />
        </div>
        
        {/* Right column - Form */}
        <Card className="md:col-span-7 lg:col-span-8 p-6 bg-purple-900/40 backdrop-blur-sm border-purple-800/50">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Select defaultValue="personal">
                  <SelectTrigger className="w-[180px] bg-purple-800/30 text-white border-purple-700/50">
                    <SelectValue placeholder="Select Calendar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="personal">Personal Calendar</SelectItem>
                    <SelectItem value="work">Work Calendar</SelectItem>
                    <SelectItem value="travel">Travel Calendar</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button variant="outline" size="sm" className="flex items-center gap-1 px-3 h-9 bg-purple-800/30 text-white border-purple-700/50">
                  <span>Public</span>
                  <ChevronsUpDown className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Theme Selection */}
            <div className="space-y-3">
              <Label className="text-white">Theme</Label>
              <ThemeSelector 
                selectedTheme={watchedValues.theme}
                onSelectTheme={(theme) => setValue('theme', theme)}
              />
            </div>
            
            {/* Event Name */}
            <div className="space-y-3">
              <Label htmlFor="eventName" className="text-white">Event Name</Label>
              <Input 
                id="eventName" 
                placeholder="Event Name" 
                className="text-2xl h-14 font-medium bg-purple-800/30 text-white placeholder:text-white/50 border-purple-700/50"
                {...register('eventName')}
              />
            </div>
            
            {/* Date and Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Start Date and Time */}
              <div className="space-y-3">
                <Label className="text-white">Start</Label>
                <div className="flex space-x-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "justify-start text-left font-normal flex-1 bg-purple-800/30 text-white border-purple-700/50",
                          !watchedValues.startDate && "text-white/50"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {watchedValues.startDate ? format(watchedValues.startDate, "EEE, MMM dd") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={watchedValues.startDate || undefined}
                        onSelect={(date) => setValue('startDate', date ?? null)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  
                  <Select
                    value={watchedValues.startTime}
                    onValueChange={(value) => setValue('startTime', value)}
                  >
                    <SelectTrigger className="w-[130px] bg-purple-800/30 text-white border-purple-700/50">
                      <Clock className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Time" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 24 }).map((_, hour) => (
                        <>
                          <SelectItem key={`${hour}:00`} value={`${hour.toString().padStart(2, '0')}:00`}>
                            {hour.toString().padStart(2, '0')}:00
                          </SelectItem>
                          <SelectItem key={`${hour}:30`} value={`${hour.toString().padStart(2, '0')}:30`}>
                            {hour.toString().padStart(2, '0')}:30
                          </SelectItem>
                        </>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* End Date and Time */}
              <div className="space-y-3">
                <Label className="text-white">End</Label>
                <div className="flex space-x-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "justify-start text-left font-normal flex-1 bg-purple-800/30 text-white border-purple-700/50",
                          !watchedValues.endDate && "text-white/50"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {watchedValues.endDate ? format(watchedValues.endDate, "EEE, MMM dd") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={watchedValues.endDate || undefined}
                        onSelect={(date) => setValue('endDate', date ?? null)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  
                  <Select
                    value={watchedValues.endTime}
                    onValueChange={(value) => setValue('endTime', value)}
                  >
                    <SelectTrigger className="w-[130px] bg-purple-800/30 text-white border-purple-700/50">
                      <Clock className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Time" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 24 }).map((_, hour) => (
                        <>
                          <SelectItem key={`${hour}:00`} value={`${hour.toString().padStart(2, '0')}:00`}>
                            {hour.toString().padStart(2, '0')}:00
                          </SelectItem>
                          <SelectItem key={`${hour}:30`} value={`${hour.toString().padStart(2, '0')}:30`}>
                            {hour.toString().padStart(2, '0')}:30
                          </SelectItem>
                        </>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            {/* Timezone */}
            <div className="flex items-center justify-end">
              <div className="inline-flex items-center px-3 py-1 bg-purple-800/30 rounded-md text-sm text-white">
                <span className="text-white/70 mr-1">GMT-05:30</span>
                <span>Calcutta</span>
              </div>
            </div>
            
            {/* Location */}
            <div className="space-y-3">
              <Label htmlFor="location" className="text-white">Add Event Location</Label>
              <Input 
                id="location" 
                placeholder="Offline location or virtual link" 
                className="bg-purple-800/30 text-white placeholder:text-white/50 border-purple-700/50"
                {...register('location')}
                startIcon={<MapPin className="h-4 w-4 text-white/70" />}
              />
            </div>
            
            {/* Description */}
            <div className="space-y-3">
              <Label htmlFor="description" className="text-white">Add Description</Label>
              <Textarea 
                id="description" 
                placeholder="Add details about your event" 
                className="min-h-[100px] bg-purple-800/30 text-white placeholder:text-white/50 border-purple-700/50"
                {...register('description')}
              />
            </div>
            
            {/* Event Options */}
            <div className="space-y-4">
              <h3 className="font-medium text-white">Event Options</h3>
              
              {/* Tickets */}
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2 text-white">
                  <TicketIcon className="h-5 w-5 text-white/70" />
                  <span>Tickets</span>
                </div>
                <div className="flex items-center text-white">
                  <span className="mr-2">Free</span>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Check className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Separator className="bg-purple-700/50" />
              
              {/* Require Approval */}
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2 text-white">
                  <Check className="h-5 w-5 text-white/70" />
                  <span>Require Approval</span>
                </div>
                <Switch 
                  checked={watchedValues.requireApproval}
                  onCheckedChange={(checked) => setValue('requireApproval', checked)}
                />
              </div>
              <Separator className="bg-purple-700/50" />
              
              {/* Capacity */}
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2 text-white">
                  <Users className="h-5 w-5 text-white/70" />
                  <span>Capacity</span>
                </div>
                <div className="flex items-center text-white">
                  <span className="mr-2">Unlimited</span>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Check className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex justify-center pt-4">
              <Button 
                type="submit"
                className="w-full md:w-auto md:px-12 bg-white text-purple-900 hover:bg-white/90"
              >
                Create Event
              </Button>
              
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}