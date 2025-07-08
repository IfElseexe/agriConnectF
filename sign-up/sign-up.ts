import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { faUser, faLock, faLeaf, faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../auth/auth'; // 

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule, RouterModule],
  templateUrl: './sign-up.html',
  styleUrls: ['./sign-up.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUp implements OnInit, OnDestroy {
  // Icons
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

 
  carouselItems = [
    {
      image: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ce',
      text: 'Did you know? AgriConnect helps farmers get 30% better prices for their produce'
    },
    {
      image: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc',
      text: 'Buyers using AgriConnect get fresher produce directly from farms'
    },
    {
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef',
      text: 'Join over 10,000 farmers and buyers already benefiting from AgriConnect'
    }
  ];
  currentSlide = 0;
  private carouselInterval: any;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,  // ✅ Use your auth.ts file
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.signUpForm = this.fb.group({
      username: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/)
      ]],
      confirmPassword: ['', Validators.required],
      userType: ['farmer', Validators.required]
    }, { validators: this.checkPasswords });

    if (isPlatformBrowser(this.platformId)) {
      this.preloadImages();
    }
  }
  ngOnDestroy(): void {
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
    }
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.startCarousel();
    }
  }

  // ✅ Password Match Validator
  checkPasswords(group: AbstractControl) {
    const formGroup = group as FormGroup;
    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('confirmPassword');

    if (!password || !confirmPassword) return null;
    return password.value === confirmPassword.value ? null : { notSame: true };
  }

  preloadImages(): void {
    this.carouselItems.forEach(item => {
      const img = new Image();
      img.src = item.image;
    });
  }

  startCarousel(): void {
    this.carouselInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.carouselItems.length;
  }

  prevSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.carouselItems.length) % this.carouselItems.length;
  }

  setUserType(type: 'farmer' | 'buyer'): void {
    this.userType = type;
    this.signUpForm.patchValue({ userType: type });
  }

  onSubmit(): void {
    this.formSubmitted = true;

    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      return;
    }

    const { username, email, password, userType } = this.signUpForm.value;
  }}