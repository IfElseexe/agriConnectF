import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClient } from '@angular/common/http';
import {
  faUsers, faUser, faEnvelope, faIdBadge, faUserShield,
  faCalendarAlt, faTools, faEye, faBan, faCheck, faDownload, faIdCard, faTrash
} from '@fortawesome/free-solid-svg-icons';
import { UserProfileModalComponent } from './user-profile-modal/user-profile-modal';

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
  status: string;
  kycStatus: string;
  createdAt: string;
}

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
  searchQuery = '';

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
  faTrash = faTrash;

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.http.get<User[]>('http://localhost:5000/api/users').subscribe({
      next: (data) => {
        console.log('📦 Users fetched:', data);
        this.users = data;
        this.filterUsers();
      },
      error: (err) => {
        console.error('❌ Error fetching users:', err);
      }
    });
  }

  filterUsers(): void {
    this.filteredUsers = this.users.filter(user => {
      const roleMatch = this.selectedRole === 'All' || user.role === this.selectedRole.toLowerCase();
      const statusMatch = this.selectedStatus === 'All' || user.status === this.selectedStatus;
      const searchMatch = !this.searchQuery ||
        user.username.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchQuery.toLowerCase());
      return roleMatch && statusMatch && searchMatch;
    });

    this.pageSlice = this.filteredUsers.slice(0, 5);
  }

  onPageChange(index: number): void {
    const startIndex = index * 5;
    const endIndex = startIndex + 5;
    this.pageSlice = this.filteredUsers.slice(startIndex, endIndex);
  }

  toggleUserStatus(user: User): void {
    user.status = user.status === 'Active' ? 'Suspended' : 'Active';
    // You can add a backend call here if needed
  }

  verifyKYC(user: User): void {
    user.kycStatus = 'Verified';
    // Add PATCH API call here if needed
  }

  openUserProfile(user: User): void {
    this.dialog.open(UserProfileModalComponent, {
      data: user,
      width: '400px'
    });
  }

  deleteUser(user: User): void {
    if (confirm(`Are you sure you want to delete ${user.username}?`)) {
      this.http.delete(`http://localhost:5000/api/users/${user._id}`).subscribe({
        next: () => {
          this.users = this.users.filter(u => u._id !== user._id);
          this.filterUsers(); // Update view
          alert('✅ User deleted');
        },
        error: (err) => {
          console.error('❌ Error deleting user:', err);
          alert('Failed to delete user');
        }
      });
    }
  }

  exportToCSV(): void {
    const rows = this.filteredUsers.map(user => ({
      Username: user.username,
      Email: user.email,
      Role: user.role,
      Status: user.status,
      Joined: new Date(user.createdAt).toLocaleDateString()
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
}
