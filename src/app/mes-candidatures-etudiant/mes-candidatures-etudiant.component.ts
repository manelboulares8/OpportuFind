import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Candidature } from '../../model/Candidature.model';
import { User } from '../../model/user.model';
import { CandidatureService } from '../services/CandidatureService';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-mes-candidatures-etudiant',
  standalone: false,
  templateUrl: './mes-candidatures-etudiant.component.html',
  styleUrl: './mes-candidatures-etudiant.component.css'
})
export class MesCandidaturesEtudiantComponent {
 candidatures!: Candidature[];


  constructor(
    private router: Router,
    private candidatureService: CandidatureService,
    private toastr: ToastrService ,
    private userService:UserService// Injection correcte
  ) {}

 
    user!: User;
    userRole: 'entrepreneur' | 'etudiant' = 'entrepreneur'; // Default role
    ngOnInit(): void {
      this.loadUserProfile();
    }
  
    loadUserProfile(): void {
      this.userService.getUserProfile().subscribe({
        next: (data) => {
          this.user = data;
          console.log('Rôle reçu:', data.role);
          
          // Déterminez le rôle de manière robuste
          if (data.role.includes('ENTREPRENEUR')) {
            this.userRole = 'entrepreneur';
          } else if (data.role.includes('ETUDIANT')) {
            this.userRole = 'etudiant';
          }
          
          console.log('Rôle final:', this.userRole);
          this.chargerCandidatures(); // Appelez seulement après avoir reçu le rôle
        },
        error: (err) => {
          console.error('Erreur profil:', err);
          this.toastr.error('Erreur chargement profil');
        }
      });
    }
    
  
    chargerCandidatures(): void {
      const userId = localStorage.getItem('userId');
      
      if (!userId) {
        this.toastr.error('Utilisateur non identifié');
        return;
      }
  
      const id = Number(userId);
      
      if (this.userRole === 'etudiant') {
        console.log('Chargement candidatures étudiant');
        this.candidatureService.getCandidaturesByEtudiant(id).subscribe({
          next: (cands) => {
            this.candidatures = cands;
            console.log('Candidatures étudiant:', cands);
          },
          error: (err) => this.toastr.error('Erreur chargement candidatures')
        });
      } else {
        console.log('Chargement candidatures entrepreneur');
        this.candidatureService.getCandidaturesByEntrepreneur(id).subscribe({
          next: (cands) => {
            this.candidatures = cands;
            console.log('Candidatures entrepreneur:', cands);
          },
          error: (err) => this.toastr.error('Erreur chargement candidatures')
        });
      }
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
  // Fonction de traduction des statuts
  getStatusLabel(status: string): string {
    switch (status) {
      case 'PENDING':
        return 'En attente';
      case 'ACCEPTED':
        return 'Accepté';
      case 'REJECTED':
        return 'Rejeté';
      default:
        return status;
    }
  }
  onStatusChange(candidature: Candidature) {
    const statusLabel = this.getStatusLabel(candidature.status);
  
    if (confirm(`Confirmez-vous le changement de statut à "${statusLabel}" ?`)) {
      let recruitmentDate: string | undefined = undefined;
  
      if (candidature.status === 'ACCEPTED') {
        if (candidature.recruitmentDate) {
          const date = new Date(candidature.recruitmentDate);
          recruitmentDate = date.toISOString().slice(0, 19);        } else {
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
goToEditCandidature(candidatureId: number, offreId: number): void {
  localStorage.setItem('candidatureToEdit', candidatureId.toString());
  this.router.navigate(['/job-detail', offreId], {
    queryParams: { editMode: 'true' }
  });
}
    
// Gestion du changement de statut

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
    localStorage.clear(); // supprime tout ce qui est dans localStorage
    this.router.navigate(['/welcome']); // redirection vers la page de login
  }
  goToMy() {
    this.router.navigate(['/lister-offre']);
  }
goToProfile(){
  this.router.navigate(['/profile']);

}
goToListerCandidatures() {
  this.router.navigate(['/lister-candidaturesEntr']);
}
goToListerCandidaturesetu() {
  this.router.navigate(['/lister-candidaturesEtu']);
}

goToListerMesOffres() {
  this.router.navigate(['/lister-offre']);
}

}
