export interface Message {
  _id: string;
  chatId: string;
  sender: {
    _id: string;
    name: string;
    role?: 'farmer' | 'buyer' | 'admin'; // Optional to avoid breaking farmer side
    avatar?: string; // Optional for UI display
  };
  content: string;
  createdAt: string;

  // Optional frontend-only flag
  isMine?: boolean;
}
