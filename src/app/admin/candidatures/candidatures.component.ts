import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Candidature } from '../../../model/Candidature.model';
import { CandidatureService } from '../../services/CandidatureService';

@Component({
  selector: 'app-candidatures',
  standalone: false,
  templateUrl: './candidatures.component.html',
  styleUrl: './candidatures.component.css'
})
export class CandidaturesComponent implements OnInit {
  candidatures!: Candidature[];
  userRole: 'admin' = 'admin'; // Rôle statique

  constructor(
    private router: Router,
    private candidatureService: CandidatureService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.chargerCandidatures(); // Appel direct
  }

  chargerCandidatures(): void {
    console.log('Chargement candidatures pour admin');
    this.candidatureService.getAllCandidatures().subscribe({
      next: (cands) => {
        this.candidatures = cands;
        console.log('Candidatures admin:', cands);
      },
      error: () => this.toastr.error('Erreur chargement candidatures')
    });
  }

  supprimerCandidature(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette candidature ?')) {
      this.candidatureService.deleteCandidature(id).subscribe({
        next: () => {
          this.toastr.success('Candidature supprimée.');
          this.chargerCandidatures();
        },
        error: () => {
          this.toastr.error('Erreur lors de la suppression.');
        }
      });
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'PENDING': return 'En attente';
      case 'ACCEPTED': return 'Accepté';
      case 'REJECTED': return 'Rejeté';
      default: return status;
    }
  }

  onStatusChange(candidature: Candidature) {
    const statusLabel = this.getStatusLabel(candidature.status);
    if (confirm(`Confirmez-vous le changement de statut à "${statusLabel}" ?`)) {
      let recruitmentDate: string | undefined = undefined;
      if (candidature.status === 'ACCEPTED') {
        if (candidature.recruitmentDate) {
          const date = new Date(candidature.recruitmentDate);
          recruitmentDate = date.toISOString().slice(0, 19);
        } else {
          this.toastr.error('La date de recrutement est requise pour accepter une candidature.');
          return;
        }
      }

      this.candidatureService.updateCandidatureStatus(
        candidature.idCandidature,
        candidature.status,
        recruitmentDate
      ).subscribe({
        next: () => {
          this.toastr.success('Statut mis à jour');
          this.chargerCandidatures();
        },
        error: (err) => {
          console.error('Erreur serveur:', err);
          this.toastr.error('Échec de la mise à jour');
          this.chargerCandidatures();
        }
      });
    } else {
      this.chargerCandidatures();
    }
  }

  // Navigation
  goToJobList() { this.router.navigate(['/job-list']); }
  goToJobDetail() { this.router.navigate(['/job-detail']); }
  goToHome() { this.router.navigate(['/dashboard']); }
  goToAbout() { this.router.navigate(['/about']); }
  goToAdd() { this.router.navigate(['/ajouter-offre']); }
  goToCategory() { this.router.navigate(['/category']); }
  goToTestimonial() { this.router.navigate(['/testimonial']); }
  goTo404() { this.router.navigate(['/error']); }
  goToContact() { this.router.navigate(['/contact']); }
  goToLogout() { localStorage.clear(); this.router.navigate(['/welcome']); }
  goToMy() { this.router.navigate(['/lister-offre']); }
  goToProfile() { this.router.navigate(['/profile']); }
  goToListerCandidatures() { this.router.navigate(['/candidatures']); }
  goToListerCandidaturesetu() { this.router.navigate(['/lister-candidaturesEtu']); }
  goToListerLesOffres() { this.router.navigate(['/offres']); }
    goToListerEtu() { this.router.navigate(['/etudiants']); }
  goToListerEnt() { this.router.navigate(['/entrepreneurs']); }
}
