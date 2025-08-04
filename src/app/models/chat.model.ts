import { Message } from './message.model';

export interface Chat {
  _id: string;

  participants: {
    _id: string;
    name: string;
    role: 'farmer' | 'buyer' | 'admin';
    avatar?: string; // ✅ Optional avatar for UI display
  }[];

  messages: Message[];

  createdAt: string;
  updatedAt: string;

  // ✅ Optional preview fields for UI (used in chat lists)
  lastMessage?: Message | null;

  // ✅ Target participant from the current user's perspective (for chat list views)
  targetParticipant?: {
    _id: string;
    name: string;
    avatar?: string;
    role: 'farmer' | 'buyer' | 'admin';
  };

  // ✅ Optional frontend-only fields for chat UI (safe additions)
  name?: string;         // For chat list display (e.g., "Admin", "Benita Ehi")
  avatar?: string;       // Avatar to show in chat list
  id?: string;           // Alias for _id if needed by frontend logic
}
