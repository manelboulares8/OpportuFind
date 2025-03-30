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

    this.authService.login(loginCredentials).subscribe({
      next: (token) => {
        console.log('Login successful, token:', token);
        localStorage.setItem('token', token);  // Store the token in localStorage
        // Optionally, navigate to the next page
        // Decode the token manually
        const userId = this.decodeJwtToken(token);  // Extract the 'id' from the decoded token
        console.log('User ID from token:', userId);  // Log the user ID to the console
        
        // Optionally, store the user ID or use it in your application logic
        localStorage.setItem('userId', userId.toString()); // Store the user ID in localStorage

        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Login failed', err);
        alert('Login failed. Please check your credentials.');
      }
    });    
  }
  decodeJwtToken(token: string): number {
    // Split the JWT token into three parts
    const parts = token.split('.');

    // The payload is the second part of the token (index 1)
    const payload = parts[1];

    // Decode the base64url encoded payload
    const decodedPayload = this.base64UrlDecode(payload);

    // Parse the decoded payload into JSON
    const parsedPayload = JSON.parse(decodedPayload);

    // Return the user ID from the decoded payload
    return parsedPayload.id;
  }
  base64UrlDecode(base64Url: string): string {
    // Add necessary padding for base64 encoding
    const padding = '='.repeat((4 - base64Url.length % 4) % 4);
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/') + padding;

    // Decode base64 string and return it
    return decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
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
        
        // Call login after successful sign-up
        const loginCredentials = {
          email: this.signupForm.value.email,
          password: this.signupForm.value.password
        };
        console.log(loginCredentials)

    
        this.authService.login(loginCredentials).subscribe({
          next: (token) => {
            console.log('Login successful, token:', token);
            localStorage.setItem('token', token);  // Store the token in localStorage
            // Optionally, navigate to the next page
            // Decode the token manually
            const userId = this.decodeJwtToken(token);  // Extract the 'id' from the decoded token
            console.log('User ID from token:', userId);  // Log the user ID to the console
            
            // Optionally, store the user ID or use it in your application logic
            localStorage.setItem('userId', userId.toString()); // Store the user ID in localStorage
    
            this.router.navigate(['/home']);
          },
          error: (err) => {
            console.error('Login failed', err);
            alert('Login failed. Please check your credentials.');
          }
        });    
  
        // Optionally navigate to home or another page after sign up
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
   // Handle user type selection change
onUserTypeChange(event: any) {
  this.userType = event.target.value;
  
  // Log the selected userType
  console.log('Selected user type:', this.userType);

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

  // Log the current values of the fields
  console.log('Signup form values:', this.signupForm.value);
}

  goToJobList() {
    this.router.navigate(['/job-list']);
  }
  goToJobDetail() {
    this.router.navigate(['/job-detail']);
  }
  goToHome() {
    this.router.navigate(['/home']);
  }

  goToAbout() {
    this.router.navigate(['/about']);
  }

  goToAdd() {
    this.router.navigate(['/ajouter-offre']);
  }

  

  goToCategory() {
    this.router.navigate(['/category']);
  }

  goToTestimonial() {
    this.router.navigate(['/testimonial']);
  }

  goTo404() {
    this.router.navigate(['/error']);
  }

  goToContact() {
    this.router.navigate(['/contact']);
  }

  goToLogout() {
    // Logique de déconnexion (si nécessaire)
    this.router.navigate(['/logout']);
  }
}