import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentification',
  standalone: false,

  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css'],
  providers: [MessageService] // Add MessageService to providers

})
export class AuthentificationComponent {
  userType: string = ''; // Variable to store the selected user type (étudiant or entrepreneur)
  loginForm: FormGroup;
  signupForm: FormGroup;
  submitted = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {
    // Initialize login form
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });

    // Initialize signup form
    this.signupForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', Validators.required],
      userType: ['', Validators.required],  // User type (Entrepreneur or Student)
      // Fields for student
      university: [''],
      parcours: [''],
      cvUrl: [''],
      // Fields for entrepreneur
      localisation: [''],
      secteur: [''],
      aboutUs: ['']
    }, {
      // Add custom validator for matching password and confirm password
      validators: this.passwordMatchValidator
    });
  }

  // Getter to access form controls
  get formControls() {
    return this.loginForm.controls;
  }

  // Password match validator for confirming passwords
  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { notMatching: true };
  }

  // Login method
  Login() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Form is invalid. Please correct the errors.' });
      return;
    }

    const loginCredentials = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    this.authService.login(loginCredentials).subscribe(
      response => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login successful' });
        // Handle successful login, like redirecting the user
        this.router.navigate(['/dashboard']); // Adjust the route as needed
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Login failed, please try again' });
        console.error(error);
      }
    );
  }

  // Signup method
  OnSignUpSubmit() {
    this.submitted = true;
  
    if (this.signupForm.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Form is invalid. Please correct the errors.' });
      return;
    }
  
    const signupData = this.signupForm.value;
    const userType = signupData.userType;  // 'entrepreneur' or 'etudiant'
  
    // Call the signUp method from authService
    this.authService.signUp(signupData, userType).subscribe(
      response => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Signup successful' });
        // Handle successful signup, like redirecting the user or showing a success message
        this.router.navigate(['/login']); // Adjust the route as needed
      },
      error => {
        console.error('Error response:', error);
  
        if (error.status === 500 && error.error && error.error.message.includes('Email is already in use')) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'The email you entered is already taken. Please use a different one.' });
        } else if (error.status === 400) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An unexpected error occurred. Please try again later.' });
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Signup failed, please try again.' });
        }
      }
    );
  }

  // Handle user type selection change
  onUserTypeChange(event: any) {
    this.userType = event.target.value;
    // Based on the user type selected, adjust the form validation and visibility
    if (this.userType === 'etudiant') {
      this.signupForm.get('university')?.setValidators([Validators.required]);
      this.signupForm.get('parcours')?.setValidators([Validators.required]);
      this.signupForm.get('cvUrl')?.setValidators([Validators.required]);
      
      this.signupForm.get('localisation')?.clearValidators();
      this.signupForm.get('secteur')?.clearValidators();
      this.signupForm.get('aboutUs')?.clearValidators();
    } else if (this.userType === 'entrepreneur') {
      this.signupForm.get('localisation')?.setValidators([Validators.required]);
      this.signupForm.get('secteur')?.setValidators([Validators.required]);
      this.signupForm.get('aboutUs')?.setValidators([Validators.required]);

      this.signupForm.get('university')?.clearValidators();
      this.signupForm.get('parcours')?.clearValidators();
      this.signupForm.get('cvUrl')?.clearValidators();
    }

    // Revalidate fields
    this.signupForm.get('university')?.updateValueAndValidity();
    this.signupForm.get('parcours')?.updateValueAndValidity();
    this.signupForm.get('cvUrl')?.updateValueAndValidity();
    this.signupForm.get('localisation')?.updateValueAndValidity();
    this.signupForm.get('secteur')?.updateValueAndValidity();
    this.signupForm.get('aboutUs')?.updateValueAndValidity();
  }
}