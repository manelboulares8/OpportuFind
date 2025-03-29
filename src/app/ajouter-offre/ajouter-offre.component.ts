import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OffreService } from '../services/offre.service'; // Ensure the path is correct
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajouter-offre',
  standalone: false,
  templateUrl: './ajouter-offre.component.html',
  
  styleUrls: ['./ajouter-offre.component.css']
})
export class AjouterOffreComponent implements OnInit {
  jobPostForm!: FormGroup; // Declare the form group

  constructor(
    private fb: FormBuilder, 
    private offreService: OffreService,
    private router: Router
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
  }

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
}