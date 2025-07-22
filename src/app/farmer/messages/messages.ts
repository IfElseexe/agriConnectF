import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FilterPipe } from '../../pipes/filter-pipe';
import { FormsModule } from '@angular/forms';
import {
  faPaperPlane,
  faPaperclip,
  faSmile,
  faTrash,
  faPhone,
  faChevronLeft
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.html',
  styleUrls: ['./messages.scss'],
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, FormsModule, FilterPipe]
})
export class Messages {
  faPaperPlane = faPaperPlane;
  faPaperclip = faPaperclip;
  faSmile = faSmile;
  faTrash = faTrash;
  faPhone = faPhone;
  faChevronLeft = faChevronLeft;

  searchTerm = '';
  selectedChat: any = null;
  messageText = '';

  chatList = [
    {
      id: 1,
      name: 'Admin Support',
      lastMessage: 'Your payment has been received.',
      time: '10:15 AM',
      unread: 1,
      online: true,
      messages: [
        { sender: 'admin', text: 'Hello, welcome to AgriConnect!', time: '9:00 AM' },
        { sender: 'me', text: 'Thanks!', time: '9:02 AM' },
        { sender: 'admin', text: 'Your payment has been received.', time: '10:15 AM' }
      ]
    },
    {
      id: 2,
      name: 'Buyer - Musa',
      lastMessage: 'When will you ship the maize?',
      time: 'Yesterday',
      unread: 0,
      online: false,
      messages: [
        { sender: 'buyer', text: 'When will you ship the maize?', time: 'Yesterday' },
        { sender: 'me', text: 'Tomorrow morning.', time: 'Yesterday' }
      ]
    }
  ];

  selectChat(chat: any) {
    this.selectedChat = chat;
  }

  sendMessage() {
    if (this.messageText.trim() && this.selectedChat) {
      this.selectedChat.messages.push({
        sender: 'me',
        text: this.messageText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      this.messageText = '';
    }
  }

  backToList() {
    this.selectedChat = null;
  }
}
