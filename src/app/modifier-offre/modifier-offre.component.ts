import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OffreService } from '../services/offre.service';
import { ToastrService } from 'ngx-toastr'; // Si tu utilises Toastr pour les notifications

@Component({
  selector: 'app-modifier-offre',
  standalone: false,
  templateUrl: './modifier-offre.component.html',
  styleUrl: './modifier-offre.component.css'
})
export class ModifierOffreComponent implements OnInit{
  jobPostForm: FormGroup;
  offreId!: number;

  constructor(
    private route: ActivatedRoute,
    private offreService: OffreService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.jobPostForm = this.fb.group({
      titre: ['', Validators.required],
      exigences: ['', Validators.required],
      localisation: ['', Validators.required],
      date: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.offreId = +this.route.snapshot.paramMap.get('id')!; // Récupérer l'ID de l'URL
    this.loadOffreDetails(this.offreId);
  }

  // Charger les détails de l'offre dans le formulaire
  loadOffreDetails(id: number): void {
    this.offreService.getOffreById(id).subscribe(
      data => {
        this.jobPostForm.patchValue({
          titre: data.titre,
          exigences: data.exigences,
          localisation: data.localisation,
          date: data.date,
          description: data.description
        });
      },
      error => {
        this.toastr.error('Erreur lors du chargement des détails de l\'offre.');
      }
    );
  }

  // Fonction pour soumettre le formulaire
  onFormSubmit(): void {
    if (this.jobPostForm.invalid) {
      return;
    }
    const updatedOffre = this.jobPostForm.value;
    this.offreService.updateOffre(this.offreId, updatedOffre).subscribe(
      response => {
        this.toastr.success('Offre modifiée avec succès');
        this.router.navigate(['/lister-offre']); // Rediriger vers la liste des offres
      },
      error => {
        this.toastr.error('Erreur lors de la modification de l\'offre');
      }
    );
  }
}