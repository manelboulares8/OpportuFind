import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OffreService } from '../services/offre.service'; // Ensure the path is correct
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-ajouter-offre',
  standalone: false,
  templateUrl: './ajouter-offre.component.html',
  
  styleUrls: ['./ajouter-offre.component.css']
})
export class AjouterOffreComponent implements OnInit {
  jobPostForm!: FormGroup; // Declare the form group
user!: User;
   userRole: 'entrepreneur' | 'etudiant' = 'entrepreneur'; // Default role
  constructor(
    private fb: FormBuilder, 
    private offreService: OffreService,
    private router: Router,
    private userService :UserService
  ) {}

 
  ngOnInit(): void {
    // Initialize the form with validations
    this.jobPostForm = this.fb.group({
      titre: ['', Validators.required],
      exigences: ['', Validators.required],
      localisation: ['', Validators.required],
      date: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.userService.getUserProfile().subscribe({
      next: (data) => {
        console.log('User data fetched:', data);
        this.user = data; // Store the user profile data
        console.log(data.role);

        // Vérifiez la valeur exacte du rôle retourné par le service
        if (data.role === 'ROLE_ENTREPRENEUR') {
          this.userRole = 'entrepreneur';
        } else if (data.role === 'ROLE_ETUDIANT') {
          this.userRole = 'etudiant';
        }

        console.log('Rôle détecté:', this.userRole); // Log the detected role
      },
      error: (err) => {
        console.error('Error loading user profile:', err);
      }
    });}
  // Method to extract the Entrepreneur ID from the JWT token
  private extractEntrepreneurId(token: string): string | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
      return payload.idEntrepreneur || null; // Extract idEntrepreneur
    } catch (err) {
      console.error('Error decoding token:', err);
      return null;
    }
  }

  // Method called when the form is submitted
  onFormSubmit(): void {
    if (this.jobPostForm.valid) {
      const entrepreneurId = localStorage.getItem('userId'); // Récupérer l'ID de l'entrepreneur depuis localStorage

      if (!entrepreneurId) {
        console.error('ID Entrepreneur non trouvé dans le stockage local !');
        alert('Impossible de récupérer l’ID de l’entrepreneur.');
        return;
      }


      // Extract the entrepreneur ID from the token


      // Create the job post data in the structure expected by the backend
      const jobPostData = {
        titre: this.jobPostForm.value.titre,
        exigences: this.jobPostForm.value.exigences,
        localisation: this.jobPostForm.value.localisation,
        description: this.jobPostForm.value.description,
        entrepreneur: { idEntrepreneur: entrepreneurId }, // Use the extracted entrepreneur ID
        date: this.jobPostForm.value.date
      };

      console.log('Job post data:', jobPostData);

      // Call the service to send the data to the backend
      this.offreService.ajouterOffre(jobPostData).subscribe({
        next: (response) => {
          console.log('Offer successfully added', response);
          alert('Offer added successfully!');
          this.router.navigate(['/lister-offre']); // Redirect to offer list after successful submission
        },
        error: (err) => {
          console.error('Error adding offer', err);
          alert('Error adding offer.');
        }
      });
    } else {
      console.log('Invalid form');
    }
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