import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {
  faUsers,
  faUser,
  faEnvelope,
  faIdBadge,
  faUserShield,
  faCalendarAlt,
  faTools,
  faEye,
  faBan,
  faCheck,
  faDownload,
  faIdCard
} from '@fortawesome/free-solid-svg-icons';

import { UserDataService, User } from './user-data';
import { UserProfileModalComponent } from './user-profile-modal/user-profile-modal'; 

@Component({
  selector: 'app-users',
  standalone: true,
  templateUrl: './users.html',
  styleUrls: ['./users.scss'],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    MatDialogModule
  ]
})
export class Users implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  pageSlice: User[] = [];

  selectedRole = 'All';
  selectedStatus = 'All';

  // FontAwesome icons
  faUsers = faUsers;
  faUser = faUser;
  faEnvelope = faEnvelope;
  faIdBadge = faIdBadge;
  faUserShield = faUserShield;
  faCalendarAlt = faCalendarAlt;
  faTools = faTools;
  faEye = faEye;
  faBan = faBan;
  faCheck = faCheck;
  faDownload = faDownload;
  faIdCard = faIdCard;

  constructor(private userService: UserDataService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
      this.filteredUsers = data;
      this.pageSlice = this.filteredUsers.slice(0, 5);
    });
  }

 searchQuery: string = '';

filterUsers(): void {
  this.filteredUsers = this.users.filter(user => {
    const roleMatch = this.selectedRole === 'All' || user.role === this.selectedRole;
    const statusMatch = this.selectedStatus === 'All' || user.status === this.selectedStatus;
    const searchMatch = !this.searchQuery ||
      user.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchQuery.toLowerCase());

    return roleMatch && statusMatch && searchMatch;
  });

  this.pageSlice = this.filteredUsers.slice(0, 5);
}

  toggleUserStatus(user: User): void {
    user.status = user.status === 'Active' ? 'Suspended' : 'Active';
  }

  verifyKYC(user: User): void {
    user.kycStatus = 'Verified';
  }

  openUserProfile(user: User): void {
    this.dialog.open(UserProfileModalComponent, {
       data: user,
       width: '400px'
     });
    alert(`Viewing profile for: ${user.name}`); // temporary
  }

  exportToCSV(): void {
    const rows = this.filteredUsers.map(user => ({
      Name: user.name,
      Email: user.email,
      Role: user.role,
      Status: user.status,
      Joined: user.joined
    }));

    const csvContent = [
      Object.keys(rows[0]).join(','),
      ...rows.map(r => Object.values(r).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'agriconnect-users.csv';
    link.click();
  }

  onPageChange(index: number): void {
    const startIndex = index * 5;
    const endIndex = startIndex + 5;
    this.pageSlice = this.filteredUsers.slice(startIndex, endIndex);
  }
}