import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { faUser, faLock, faLeaf, faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../auth/auth';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule, RouterModule],
  templateUrl: './sign-up.html',
  styleUrls: ['./sign-up.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUp implements OnInit {
  // FontAwesome icons
  faUser = faUser;
  faLock = faLock;
  faLeaf = faLeaf;
  faShoppingBasket = faShoppingBasket;
  faGoogle = faGoogle;
  faFacebookF = faFacebookF;
  faInstagram = faInstagram;

  signUpForm: FormGroup;
  userType: 'farmer' | 'buyer' = 'farmer';
  formSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.signUpForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        userType: ['farmer', Validators.required]
      },
      { validators: this.matchPasswords }
    );
  }

  ngOnInit(): void {
    this.setUserType(this.userType);
  }

  matchPasswords(group: AbstractControl) {
    const form = group as FormGroup;
    const pass = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return pass === confirm ? null : { notSame: true };
  }

  setUserType(type: 'farmer' | 'buyer') {
    this.userType = type;
    this.signUpForm.patchValue({ userType: type });
  }

  isLoading = false;

onSubmit(): void {
  this.formSubmitted = true;
  if (this.signUpForm.invalid) {
    this.signUpForm.markAllAsTouched();
    return;
  }

  this.isLoading = true;
  const { username, email, password, userType } = this.signUpForm.value;

  this.auth.signUp({ username, email, password, role: userType }).subscribe({
    next: () => {
      alert('Signup successful!');
      this.router.navigate(['/sign-in']);
    },
    error: (err) => {
      alert(err?.error?.message || 'Signup failed. Try again.');
      console.error(err);
    },
    complete: () => {
      this.isLoading = false;
    }
  });
}

}
