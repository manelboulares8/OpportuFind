import { Component, OnInit } from '@angular/core';
import { Offre } from '../../model/offre.model';
import { OffreService } from '../services/offre.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';
import { User } from '../../model/user.model';

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
    private toastr: ToastrService ,
    private userService:UserService// Injection correcte
  ) {}

 
    user!: User;
    userRole: 'entrepreneur' | 'etudiant' = 'entrepreneur'; // Default role
     ngOnInit(): void {
      this.chargerOffres();
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
       });
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