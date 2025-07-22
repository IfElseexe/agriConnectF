export interface Message {
  sender: 'Admin' | 'User';
  text: string;
  timestamp: string;
}

export interface MessageThread {
  id: string;
  participants: string; 
  messages: Message[];
}

export const dummyConversations: MessageThread[] = [
  {
    id: 'thread1',
    participants: 'Benita Inalegwu & Admin',
    messages: [
      {
        sender: 'User',
        text: 'Hi, I’m having trouble with a buyer',
        timestamp: new Date().toISOString()
      },
      {
        sender: 'Admin',
        text: 'No worries, I’ll check it out',
        timestamp: new Date().toISOString()
      }
    ]
  },
  {
    id: 'thread2',
    participants: 'Emmanuel Ajibade & Admin',
    messages: [
      {
        sender: 'User',
        text: 'Can I get my transaction ID?',
        timestamp: new Date().toISOString()
      },
      {
        sender: 'Admin',
        text: 'Sure, hold on.',
        timestamp: new Date().toISOString()
      }
    ]
  }
];