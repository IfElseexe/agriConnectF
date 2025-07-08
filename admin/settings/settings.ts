import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faUserShield, faPaintBrush, faLock, faKey, faPowerOff
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-settings',
  standalone: true,
  templateUrl: './settings.html',
  styleUrls: ['./settings.scss'],
  imports: [CommonModule, FormsModule, FontAwesomeModule]
})
export class Settings implements OnInit {
  faUserShield = faUserShield;
  faPaintBrush = faPaintBrush;
  faLock = faLock;
  faKey = faKey;
  faPowerOff = faPowerOff;

  settings = {
    theme: 'light',
    enable2FA: true,
    logoutTimeout: 10,
    allowedIPs: ['192.168.1.1'],
    platformColor: '#4caf50'
  };

  ngOnInit(): void {}

  toggleTheme(): void {
    this.settings.theme = this.settings.theme === 'light' ? 'dark' : 'light';
  }

  addIP(ip: string): void {
    if (ip && !this.settings.allowedIPs.includes(ip)) {
      this.settings.allowedIPs.push(ip);
    }
  }

  removeIP(ip: string): void {
    this.settings.allowedIPs = this.settings.allowedIPs.filter(x => x !== ip);
  }
}