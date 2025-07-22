import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faUserShield,
  faPaintBrush,
  faLock,
  faKey,
  faPowerOff,
  faPlus,
  faTrash
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-settings',
  standalone: true,
  templateUrl: './settings.html',
  styleUrls: ['./settings.scss'],
  imports: [CommonModule, FormsModule, FontAwesomeModule]
})
export class Settings implements OnInit {
  // Font Awesome icons
  faUserShield = faUserShield;
  faPaintBrush = faPaintBrush;
  faLock = faLock;
  faKey = faKey;
  faPowerOff = faPowerOff;
  faPlus = faPlus;
  faTrash = faTrash;

  ipInput: string = '';

  settings = {
    theme: 'light',
    enable2FA: true,
    logoutTimeout: 10,
    allowedIPs: [] as string[],
    platformColor: '#4caf50'
  };

 ngOnInit(): void {
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.settings.theme = 'dark';
      document.body.classList.add('dark-mode');
    }

    const storedIPs = localStorage.getItem('allowedIPs');
    if (storedIPs) {
      this.settings.allowedIPs = JSON.parse(storedIPs);
    }
  }
}

  toggleTheme(): void {
    this.settings.theme = this.settings.theme === 'light' ? 'dark' : 'light';
    if (this.settings.theme === 'dark') {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  }

  addIP(): void {
    const ip = this.ipInput.trim();
    if (ip && !this.settings.allowedIPs.includes(ip)) {
      this.settings.allowedIPs.push(ip);
      this.ipInput = '';
      this.saveIPs();
    }
  }

  removeIP(ip: string): void {
    this.settings.allowedIPs = this.settings.allowedIPs.filter(x => x !== ip);
    this.saveIPs();
  }

  saveIPs(): void {
    localStorage.setItem('allowedIPs', JSON.stringify(this.settings.allowedIPs));
  }

  updatePlatformColor(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.settings.platformColor = input.value;
    document.documentElement.style.setProperty('--platform-color', this.settings.platformColor);
  }
}