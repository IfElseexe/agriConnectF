import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
//import { EmojiPickerModule } from 'ngx-emoji-picker';

import {
  faSearch,
  faPaperPlane,
  faExclamationTriangle,
  faSignOutAlt,
  faMessage,
  faSmile,
  faPaperclip
} from '@fortawesome/free-solid-svg-icons';

import { dummyConversations, MessageThread } from './dummy-messages';
import { CANNED_REPLIES } from './canned-replies';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],// EmojiPickerModule
  templateUrl: './messages.html',
  styleUrls: ['./messages.scss']
})
export class Messages implements OnInit {
  faSearch = faSearch;
  faSend = faPaperPlane;
  faWarn = faExclamationTriangle;
  faLeave = faSignOutAlt;
  faMsg = faMessage;
  faEmoji = faSmile;
  faAttach = faPaperclip;

  conversations: MessageThread[] = [];
  filteredConversations: MessageThread[] = [];
  selectedThread: MessageThread | null = null;

  searchQuery = '';
  adminMessage = '';
  cannedReplies = CANNED_REPLIES;
  showEmojiPicker = false;
  attachedFile: File | null = null;
  attachedImageUrl: string | null = null;

  ngOnInit(): void {
    this.conversations = dummyConversations;
    this.filteredConversations = [...this.conversations];

    // Simulate incoming reply every 20 seconds
    setInterval(() => {
      if (this.selectedThread) {
        this.selectedThread.messages.push({
          sender: 'User',
          text: 'Thanks for the update!',
          timestamp: new Date().toISOString()
        });
      }
    }, 20000);
  }

  selectThread(thread: MessageThread): void {
    this.selectedThread = thread;
  }

  sendAdminMessage(): void {
    if (!this.adminMessage.trim() && !this.attachedImageUrl) return;

    const newMsg = {
      sender: 'Admin' as 'Admin',
      text: this.adminMessage.trim(),
      timestamp: new Date().toISOString()
    };

    if (this.selectedThread) {
      this.selectedThread.messages.push(newMsg);

      if (this.attachedImageUrl) {
        this.selectedThread.messages.push({
          sender: 'Admin',
          text: this.attachedImageUrl || '[Image]',
          timestamp: new Date().toISOString()
        });
      }
    }

    this.adminMessage = '';
    this.attachedFile = null;
    this.attachedImageUrl = null;
  }

  handleEmojiSelect(event: any): void {
    this.adminMessage += event.emoji.native;
    this.showEmojiPicker = false;
  }

  handleFileInput(event: any): void {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      this.attachedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.attachedImageUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  leaveThread(): void {
    this.selectedThread = null;
  }

  applyCannedReply(reply: string): void {
    this.adminMessage = reply;
  }

  searchConversations(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredConversations = this.conversations.filter(c =>
      c.participants.toLowerCase().includes(query)
    );
  }
}