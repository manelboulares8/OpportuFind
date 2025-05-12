import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Offre } from '../../model/offre.model';
import { OffreService } from '../services/offre.service';
import { EntrepreneurService } from '../services/entrepreneur.service';
import { User } from '../../model/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-job-list',
  standalone: false,
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  offres!: Offre[];
  user!: User;
  userRole: 'entrepreneur' | 'etudiant' = 'entrepreneur';

  constructor(
    private router: Router,
    private offreService: OffreService,
    private entrepreneurService: EntrepreneurService,
    private toastr: ToastrService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.chargerOffres();
    this.userService.getUserProfile().subscribe({
      next: (data) => {
        console.log('User data fetched:', data);
        this.user = data;
        console.log(data.role);
    
        if (data.role === 'ROLE_ENTREPRENEUR') {
          this.userRole = 'entrepreneur';
        } else if (data.role === 'ROLE_ETUDIANT') {
          this.userRole = 'etudiant';
        }
    
        console.log('Rôle détecté:', this.userRole);
      },
      error: (err) => {
        console.error('Error loading user profile:', err);
      }
    });
  }

  chargerOffres(): void {
    this.offreService.getOffres().subscribe(
      (offres) => {
        this.offres = offres;
        console.log('Offres chargées :', this.offres);
  
        // Process each offer one by one
        for (const offre of this.offres) {
          this.loadEntrepreneurName(offre);
        }
      },
      (error) => {
        this.toastr.error('Erreur lors du chargement des offres.', 'Erreur');
        console.error('Error loading offers:', error);
      }
    );
  }
  
  private loadEntrepreneurName(offre: any): void {
    this.offreService.getEntrepreneurIdByOfferId(offre.idOffre).subscribe(
      (entrepreneurId) => {
        console.log('Entrepreneur ID:', entrepreneurId);
        
        this.entrepreneurService.getEntrepreneurById(entrepreneurId).subscribe(
          (entrepreneur) => {
            offre.entrepreneurName = entrepreneur?.fullName || 'Unknown';
          },
          (error) => {
            console.error('Error fetching entrepreneur details', error);
            offre.entrepreneurName = 'Unknown';
          }
        );
      },
      (error) => {
        console.error('Error fetching entrepreneur ID', error);
        offre.entrepreneurName = 'Unknown';
      }
    );
  }
  // MODIFIED THIS METHOD TO ACCEPT OFFER ID
  goToJobDetail(offerId: number): void {
    this.router.navigate(['/job-detail', offerId]);
  }
  
  goToJobList() {
    this.router.navigate(['/job-list']);
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
}


  // KEPT ALL OTHER EXISTING METHODS EXACTLY THE SAM