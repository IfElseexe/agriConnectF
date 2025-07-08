import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { User } from '../user-data';

@Component({
  selector: 'app-user-profile-modal',
  standalone: true,
  templateUrl: './user-profile-modal.html',
  styleUrls: ['./user-profile-modal.scss'],
  imports: [CommonModule, FontAwesomeModule]
})
export class UserProfileModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: User) {}
}