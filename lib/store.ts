'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { InviteFormData, Invite, Theme } from '@/types/invite'

interface InviteStore {
  // Current form data
  formData: InviteFormData;
  updateFormData: (data: Partial<InviteFormData>) => void;
  resetForm: () => void;
  
  // Saved invites
  invites: Invite[];
  currentInvite: Invite | null;
  saveInvite: () => void;
  setCurrentInvite: (invite: Invite | null) => void;
  
  // Available themes
  availableThemes: Theme[];
}

// Default themes - in a real app, these would come from an API
const defaultThemes: Theme[] = [
  {
    id: '1',
    name: 'Space Explorer',
    thumbnail: 'https://images.pexels.com/photos/41162/moon-landing-apollo-11-nasa-buzz-aldrin-41162.jpeg?auto=compress&cs=tinysrgb&w=300',
    type: 'image',
    url: 'https://images.pexels.com/photos/41162/moon-landing-apollo-11-nasa-buzz-aldrin-41162.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '2',
    name: 'Tropical Paradise',
    thumbnail: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=300',
    type: 'image',
    url: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '3',
    name: 'Urban Adventure',
    thumbnail: 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=300',
    type: 'image',
    url: 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '4',
    name: 'Waves',
    thumbnail: 'https://images.pexels.com/photos/924824/pexels-photo-924824.jpeg?auto=compress&cs=tinysrgb&w=300',
    type: 'video',
    url: 'https://player.vimeo.com/external/332588783.hd.mp4?s=981a21e0511c1a0c12b6d6a9b73c81c4c5177c46&profile_id=175&oauth2_token_id=57447761'
  },
  {
    id: '5',
    name: 'Mountain Serenity',
    thumbnail: 'https://images.pexels.com/photos/361104/pexels-photo-361104.jpeg?auto=compress&cs=tinysrgb&w=300',
    type: 'image',
    url: 'https://images.pexels.com/photos/361104/pexels-photo-361104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
];

// Default form data
const defaultFormData: InviteFormData = {
  theme: null,
  eventName: '',
  startDate: null,
  startTime: '12:00',
  endDate: null,
  endTime: '13:00',
  location: '',
  description: '',
  timezone: 'GMT-05:30',
  tickets: {
    price: 'Free',
    currency: 'USD'
  },
  requireApproval: false,
  capacity: 'Unlimited'
};

export const useInviteStore = create<InviteStore>()(
  persist(
    (set) => ({
      formData: {...defaultFormData},
      updateFormData: (data) => set((state) => ({
        formData: { ...state.formData, ...data }
      })),
      resetForm: () => set({ formData: {...defaultFormData} }),
      
      invites: [],
      currentInvite: null,
      saveInvite: () => set((state) => {
        const newInvite: Invite = {
          ...state.formData,
          id: `invite_${Date.now()}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        return {
          invites: [...state.invites, newInvite],
          currentInvite: newInvite
        };
      }),
      setCurrentInvite: (invite) => set({ currentInvite: invite }),
      
      availableThemes: defaultThemes,
    }),
    {
      name: 'invite-store'
    }
  )
);