export interface Theme {
  id: string;
  name: string;
  thumbnail: string;
  type: 'image' | 'video';
  url: string;
}

export interface InviteFormData {
  theme: Theme | null;
  eventName: string;
  startDate: Date | null;
  startTime: string;
  endDate: Date | null;
  endTime: string;
  location: string;
  description: string;
  timezone: string;
  tickets: {
    price: string;
    currency: string;
  };
  requireApproval: boolean;
  capacity: string;
}

export interface Invite extends InviteFormData {
  id: string;
  createdAt: string;
  updatedAt: string;
}