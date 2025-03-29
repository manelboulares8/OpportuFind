import { Component, OnInit } from '@angular/core';
import { Offre } from '../../model/offre.model';
import { OffreService } from '../services/offre.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lister-offre',
  standalone: false,

  templateUrl: './lister-offre.component.html',
  styleUrl: './lister-offre.component.css'
})
export class ListerOffreComponent implements OnInit {
  offres!: Offre[];

  constructor(
    private router: Router,
    private offreServices: OffreService,
    private toastr: ToastrService // Injection correcte
  ) {}

  ngOnInit(): void {
    this.chargerOffres();
  }
  chargerOffres(): void {
    const entrepreneurId = localStorage.getItem('userId'); // Get the entrepreneur's ID from localStorage
  
    if (!entrepreneurId) {
      console.error('ID Entrepreneur non trouvé dans le stockage local !');
      alert('Impossible de récupérer l’ID de l’entrepreneur.');
      return;
    }
  
    // Parse the ID to a number
    const id = Number(entrepreneurId);
  
    // Ensure the parsed value is a valid number
    if (isNaN(id)) {
      console.error('ID Entrepreneur invalide !');
      alert('L\'ID de l\'entrepreneur est invalide.');
      return;
    }
  
    this.offreServices.getOffresByEntrepreneur(id).subscribe(
      (off) => {
        console.log(off);
        this.offres = off;
      },
      (error) => {
        this.toastr.error('Erreur lors du chargement des offres.', 'Erreur');
      }
    );
  }
  

  supprimerOffre(o: Offre): void {
    let conf = confirm('Etes-vous sûr ?');
    if (conf) {
      this.offreServices.deleteOffre(o.idOffre).subscribe({
        next: () => {
          console.log('Offre supprimée');
          this.chargerOffres(); // Recharge la liste des offres
          this.toastr.success('Offre supprimée avec succès.', 'Succès');
        },
        error: (err) => {
          console.error('Erreur lors de la suppression de l\'offre', err);
          this.toastr.error('Erreur lors de la suppression de l\'offre', 'Erreur');
        }
      });
    }
  }

  ModifierOffre(id: number): void {
    this.offreServices.getOffreById(id).subscribe(
      (data) => {
        this.router.navigate(['/modifier', id], { state: { offre: data } });
        this.toastr.success('L\'offre a été récupérée pour modification.', 'Succès');
      },
      (error) => {
        this.toastr.error('Erreur lors de la récupération de l\'offre.', 'Erreur');
      }
    );
  }
}