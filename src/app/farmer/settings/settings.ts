import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import {
  faUser,
  faEnvelope,
  faPhone,
  faLock,
  faMoon,
  faGlobe,
  faBell,
  faTrash,
  faSave,
  faEyeSlash,
  faCog,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.html',
  styleUrls: ['./settings.scss'],
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, FormsModule]

})
export class Settings {
  // FontAwesome Icons
  faUser = faUser;
  faEnvelope = faEnvelope;
  faPhone = faPhone;
  faLock = faLock;
  faMoon = faMoon;
  faGlobe = faGlobe;
  faBell = faBell;
  faTrash = faTrash;
  faSave = faSave;
  faEyeSlash = faEyeSlash;
  faCog = faCog;

  profileImage: string | ArrayBuffer | null = 'assets/img/default-user.png'; // default avatar
  user = {
    name: 'Emmanuel Ajibade',
    email: 'jibacrown007@gmail.com',
    phone: '07062723107',
    language: 'English',
    darkMode: false,
    emailNotif: true,
    smsNotif: false,
    twoFactor: false
  };

  newPassword = '';
  confirmPassword = '';

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImage = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  toggleDarkMode() {
    this.user.darkMode = !this.user.darkMode;
    document.body.classList.toggle('dark-mode', this.user.darkMode);
  }

  saveSettings() {
    alert('Settings saved!');
    // Submit to backend here
  }

  confirmDeactivate() {
    const confirmDelete = confirm('Are you sure you want to deactivate your account?');
    if (confirmDelete) {
      alert('Account deactivated');
      // Send request to backend
    }
  }
}
