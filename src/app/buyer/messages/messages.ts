import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faPaperPlane, faPaperclip, faSmile } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './messages.html',
  styleUrls: ['./messages.scss']
})
export class Messages {
  conversations = [
    {
      id: 1,
      name: 'Farmer John',
      avatar: 'https://via.placeholder.com/40',
      messages: [
        { fromMe: false, text: 'Hi, when can I pick up the yams?' },
        { fromMe: true, text: 'Tomorrow morning works. Does 9am suit?' },
        { fromMe: false, text: 'Perfect, thank you!' }
      ],
    },
    {
      id: 2,
      name: 'Support Team',
      avatar: 'https://via.placeholder.com/40/00ccff',
      messages: [
        { fromMe: false, text: 'Your order has been shipped.' },
        { fromMe: true, text: 'Great! Thanks 😊' }
      ],
    }
  ];

  selectedConv = this.conversations[0];
  newMessage = '';

  constructor(iconLib: FaIconLibrary) {
    iconLib.addIcons(faPaperPlane, faPaperclip, faSmile);
  }

  selectConversation(conv: any) {
    this.selectedConv = conv;
  }

  sendMessage() {
    if (!this.newMessage.trim()) return;
    this.selectedConv.messages.push({ fromMe: true, text: this.newMessage.trim() });
    this.newMessage = '';
    setTimeout(() => {
      this.selectedConv.messages.push({ fromMe: false, text: 'Thanks for the update!' });
    }, 800);
  }
}
