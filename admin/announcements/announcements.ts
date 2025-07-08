import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBullhorn,
  faPaperPlane,
  faUsers,
  faClock,
  faSave
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-announcements',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './announcements.html',
  styleUrls: ['./announcements.scss']
})
export class Announcements implements OnInit {
  faBullhorn = faBullhorn;
  faPaperPlane = faPaperPlane;
  faUsers = faUsers;
  faClock = faClock;
  faSave = faSave;

  audience: string = 'all';
  delivery: string[] = ['in-app'];
  message = '';
  scheduledAt = '';
  templates = [
    '🎉 Don’t miss our new product policy update!',
    '📢 AgriConnect now supports bulk orders.',
    '🚚 Delivery policies updated. Check the logistics tab!'
  ];
  sentMessages: any[] = [];

  ngOnInit(): void {}

  useTemplate(t: string): void {
    this.message = t;
  }

  send(): void {
    if (this.message.trim()) {
      this.sentMessages.unshift({
        content: this.message,
        audience: this.audience,
        delivery: this.delivery.join(', '),
        timestamp: new Date().toLocaleString()
      });

      this.message = '';
      alert('Broadcast scheduled!');
    }
  }
}