'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronDown, ChevronUp, Check } from 'lucide-react'
import { Theme } from '@/types/invite'
import { useInviteStore } from '@/lib/store'
import { cn } from '@/lib/utils'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface ThemeSelectorProps {
  selectedTheme: Theme | null;
  onSelectTheme: (theme: Theme) => void;
}

export default function ThemeSelector({ 
  selectedTheme, 
  onSelectTheme 
}: ThemeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { availableThemes } = useInviteStore()

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div className="flex cursor-pointer">
          <div className="flex h-16 items-center gap-2 rounded-l-md border bg-card px-4 transition-all">
            <div className="h-10 w-10 overflow-hidden rounded-md">
              {selectedTheme ? (
                <div className="relative h-full w-full">
                  <Image 
                    src={selectedTheme.thumbnail}
                    alt={selectedTheme.name}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
              ) : (
                <div className="h-full w-full bg-muted"></div>
              )}
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-sm text-muted-foreground">Theme</p>
              <p className="font-medium">
                {selectedTheme ? selectedTheme.name : 'Minimal'}
              </p>
            </div>
          </div>
          <div className="flex h-16 w-10 items-center justify-center rounded-r-md border border-l-0 bg-muted transition-all">
            {isOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-full p-2 max-w-md" align="start">
        <div className="grid grid-cols-2 gap-2 max-h-[400px] overflow-y-auto py-2">
          {availableThemes.map((theme) => (
            <ThemeOption
              key={theme.id}
              theme={theme}
              isSelected={selectedTheme?.id === theme.id}
              onSelect={onSelectTheme}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

interface ThemeOptionProps {
  theme: Theme;
  isSelected: boolean;
  onSelect: (theme: Theme) => void;
}

function ThemeOption({ theme, isSelected, onSelect }: ThemeOptionProps) {
  return (
    <div 
      className={cn(
        "group relative overflow-hidden rounded-md cursor-pointer border transition-all hover:ring-2 hover:ring-primary/50",
        isSelected ? "ring-2 ring-primary" : ""
      )}
      onClick={() => onSelect(theme)}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        <Image
          src={theme.thumbnail}
          alt={theme.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 200px"
        />
        
        {theme.type === 'video' && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <span className="text-white text-xs px-2 py-1 bg-black/50 rounded-full">
              MP4
            </span>
          </div>
        )}
        
        {isSelected && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <Check className="h-6 w-6 text-white" />
          </div>
        )}
      </div>
      
      <div className="p-2 text-center">
        <p className="text-sm font-medium truncate">{theme.name}</p>
      </div>
    </div>
  )
}