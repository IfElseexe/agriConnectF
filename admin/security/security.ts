import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faLock,
  faUserShield,
  faNetworkWired,
  faTrash,
  faDownload,
  faClockRotateLeft
} from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-security',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, FormsModule],
  templateUrl: './security.html',
  styleUrls: ['./security.scss']
})
export class Security implements OnInit {
  faLock = faLock;
  faUserShield = faUserShield;
  faNetwork = faNetworkWired;
  faTrash = faTrash;
  faDownload = faDownload;
  faAudit = faClockRotateLeft;

  ipWhitelist = ['102.89.234.12', '197.210.45.1'];
  newIP = '';
  twoFactorEnabled = true;

  auditLogs = [
    { user: 'Super Admin', action: 'Banned User #329', timestamp: '2025-07-07 14:02' },
    { user: 'Moderator', action: 'Verified KYC for #102', timestamp: '2025-07-07 12:45' },
    { user: 'Super Admin', action: 'Updated product categories', timestamp: '2025-07-06 16:22' }
  ];

  ngOnInit(): void {}

  addIP(): void {
    if (this.newIP.trim()) {
      this.ipWhitelist.push(this.newIP.trim());
      this.newIP = '';
    }
  }

  removeIP(ip: string): void {
    this.ipWhitelist = this.ipWhitelist.filter(i => i !== ip);
  }

  toggle2FA(): void {
    this.twoFactorEnabled = !this.twoFactorEnabled;
  }

  exportData(): void {
    alert('Simulated export: user data CSV has been generated.');
  }

  deleteData(): void {
    alert('Simulated delete: user data removed as per GDPR compliance.');
  }
}