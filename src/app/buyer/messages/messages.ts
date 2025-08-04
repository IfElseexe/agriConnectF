import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';
import { Chat } from '../../models/chat.model';
import { Message } from '../../models/message.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-buyer-messages',
  templateUrl: 'messages.html',
  styleUrls: ['messages.scss'],
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, FormsModule, RouterModule],
})
export class Messages implements OnInit {
  conversations: Chat[] = [];
  selectedConv: Chat | null = null;
  messages: Message[] = [];
  newMessage: string = '';
  loadingMessages = false;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.getUserConversations().subscribe({
      next: (convs) => {
        this.conversations = convs;

        // Check if there's a target to auto-open
        const target = localStorage.getItem('chatTarget');
        if (target) {
          const parsed = JSON.parse(target);
          const existing = this.conversations.find(c => c._id === parsed.id);

          if (existing) {
            this.selectConversation(existing);
          } else {
            const newConv: Chat = {
              _id: parsed.id,
              participants: [],
              messages: [],
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              lastMessage: null,
              targetParticipant: {
                _id: parsed.id,
                name: parsed.name,
                avatar: parsed.avatar,
                role: 'farmer' // default role, can adjust if needed
              }
            };
            this.conversations.push(newConv);
            this.selectConversation(newConv);
          }
          localStorage.removeItem('chatTarget');
        }
      },
      error: (err) => console.error(err)
    });
  }

  selectConversation(conv: Chat) {
    this.selectedConv = conv;
    this.loadingMessages = true;
    this.chatService.getMessages(conv._id).subscribe({
      next: (msgs) => {
        this.messages = msgs;
        this.loadingMessages = false;
      },
      error: (err) => {
        console.error(err);
        this.loadingMessages = false;
      }
    });
  }

  sendMessage() {
    if (!this.newMessage.trim() || !this.selectedConv) return;

    const content = this.newMessage.trim();
    this.chatService.sendMessage(this.selectedConv._id, content).subscribe({
      next: (msg) => {
        this.messages.push(msg);
        this.selectedConv!.lastMessage = msg;
        this.newMessage = '';
      },
      error: (err) => console.error(err)
    });
  }
}
