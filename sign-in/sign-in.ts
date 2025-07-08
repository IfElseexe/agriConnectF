import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faLock, faCalculator, faLeaf, faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faGoogle, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { Router, RouterModule} from '@angular/router';
import { AuthService } from '../auth/auth';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    RouterModule
  ],
  templateUrl: './sign-in.html',
  styleUrls: ['./sign-in.scss']
})
export class SignIn implements OnInit {
  // Font Awesome icons
  faUser = faUser;
  faLock = faLock;
  faCalculator = faCalculator;
  faLeaf = faLeaf;
  faShoppingBasket = faShoppingBasket;
  faFacebook = faFacebookF;
  faGoogle = faGoogle;
  faLinkedin = faLinkedinIn;

  // Form group
  loginForm!: FormGroup;

  // Math CAPTCHA
  mathQuestion: string = '';
  mathAnswer: number = 0;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.generateMathQuestion();
    this.initializeForm();
  }

  private initializeForm(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      mathAnswer: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      role: ['farmer', Validators.required] // Default to farmer
    });
  }

  generateMathQuestion(): void {
    const num1 = Math.floor(Math.random() * 5) + 1;
    const num2 = Math.floor(Math.random() * 5) + 1;
    
    if (this.loginForm?.get('role')?.value === 'farmer') {
      this.mathQuestion = `${num1} + ${num2} = ?`;
      this.mathAnswer = num1 + num2;
    } else {
      this.mathQuestion = `${num1} × ${num2} = ?`;
      this.mathAnswer = num1 * num2;
    }
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.markFormGroupTouched(this.loginForm);
      return;
    }

    const userAnswer = Number(this.loginForm.value.mathAnswer);
    if (userAnswer !== this.mathAnswer) {
      alert('Incorrect math answer. Please try again.');
      this.generateMathQuestion();
      this.loginForm.get('mathAnswer')?.reset();
      return;
    }

    const { username, password, role } = this.loginForm.value;
    const success = this.auth.login(username, password);

    if (!success) {
      alert(`Invalid ${role} credentials`);
    }
  }

  onRoleChange(): void {
    this.generateMathQuestion();
    this.loginForm.get('mathAnswer')?.reset();
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}