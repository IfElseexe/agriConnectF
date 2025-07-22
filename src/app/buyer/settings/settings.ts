import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faUser, faLock, faBell, faQuestionCircle, faInfoCircle, faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './settings.html',
  styleUrls: ['./settings.scss']
})
export class Settings {
  user = {
    name: 'Emmanuel Ajibade',
    username: 'ajibade_emi',
    email: 'jibacrown007@gmail.com',
    phone: '07062723107',
    image: 'https://via.placeholder.com/80'
  };

  constructor(lib: FaIconLibrary) {
    lib.addIcons(faUser, faLock, faBell, faQuestionCircle, faInfoCircle, faChevronRight);
  }
}
