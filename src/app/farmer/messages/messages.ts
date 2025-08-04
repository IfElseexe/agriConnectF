import { Component, OnInit } from '@angular/core';
import { Chat } from '../../models/chat.model';
import { Message } from '../../models/message.model';
import { ChatService } from './chat.service';
import { AuthService } from '../../auth/auth';
import { CommonModule } from '@angular/common'; 
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.html',
  styleUrls: ['./messages.scss'],
  imports: [CommonModule, FontAwesomeModule, FormsModule],
  standalone: true
})
export class Messages implements OnInit {
  chats: Chat[] = [];
  selectedChat: Chat | null = null;
  messages: Message[] = [];
  newMessage = '';
  currentUserId = '';

  constructor(private chatService: ChatService, private authService: AuthService) {}

  ngOnInit(): void {
    const user = this.authService.getUser(); // assumes a method like this exists
    this.currentUserId = user._id;

    this.chatService.getChats().subscribe(chats => {
      this.chats = chats;
    });
  }

  selectChat(chat: Chat): void {
    this.selectedChat = chat;
    this.chatService.getMessages(chat._id).subscribe(messages => {
      this.messages = messages;
    });
  }

  sendMessage(): void {
    if (!this.newMessage.trim() || !this.selectedChat) return;

    this.chatService.sendMessage(this.selectedChat._id, this.newMessage.trim()).subscribe(message => {
      this.messages.push(message);
      this.newMessage = '';
    });
  }

  getChatPartnerName(chat: Chat): string {
    const partner = chat.participants.find(p => p._id !== this.currentUserId);
    return partner?.name || 'User';
  }
}
