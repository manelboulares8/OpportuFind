import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OffreService } from '../services/offre.service'; // Assure-toi que le chemin est correct
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajouter-offre',
  standalone: false,
  templateUrl: './ajouter-offre.component.html',
  styleUrl: './ajouter-offre.component.css'
})
export class AjouterOffreComponent implements OnInit {
  jobPostForm!: FormGroup; // Déclaration du formulaire

  constructor(
    private fb: FormBuilder, 
    private offreService: OffreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialisation du formulaire avec les validations
    this.jobPostForm = this.fb.group({
      titre: ['', Validators.required],
      exigences: ['', Validators.required],
      localisation: ['', Validators.required],
      date: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  // Méthode appelée lors de la soumission du formulaire
  onFormSubmit(): void {
    if (this.jobPostForm.valid) {
      console.log('Offre soumise :', this.jobPostForm.value);

      // Appel au service pour envoyer les données au backend
      this.offreService.ajouterOffre(this.jobPostForm.value).subscribe({
        next: (response) => {
          console.log('Offre ajoutée avec succès', response);
          alert('Offre ajoutée avec succès !');
          this.router.navigate(['/lister-offre']); // Redirection vers la liste des offres après ajout
        },
        error: (err) => {
          console.error('Erreur lors de l\'ajout de l\'offre', err);
          alert('Erreur lors de l\'ajout de l\'offre.');
        }
      });
    } else {
      console.log('Formulaire invalide');
    }
  }
}
