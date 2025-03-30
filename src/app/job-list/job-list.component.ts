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

  constructor(
    private router: Router,
    private offreService: OffreService,
    private entrepreneurService: EntrepreneurService, // Injecting the entrepreneur service
    private toastr: ToastrService,
    private userService:UserService
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
    this.offreService.getOffres().subscribe(
      (off) => {
        this.offres = off;

        // For each offer, fetch the entrepreneur ID and the entrepreneur's name
        this.offres.forEach((offre) => {
          this.offreService.getEntrepreneurIdByOfferId(offre.idOffre).subscribe(
            (entrepreneurId) => {
              console.log(entrepreneurId)
              // Fetch the entrepreneur's name using the ID
              this.entrepreneurService.getEntrepreneurById(entrepreneurId).subscribe(
                (entrepreneur) => {
                  // Set the entrepreneur name in the offer
                  offre.entrepreneurName = entrepreneur?.fullName || 'Unknown';
                },
                (error) => {
                  console.error('Error fetching entrepreneur details', error);
                  offre.entrepreneurName = 'Unknown'; // Handle error if fetching the name fails
                }
              );
            },
            (error: any) => {
              console.error('Error fetching entrepreneur ID', error);
              offre.entrepreneurName = 'Unknown'; // Handle error if fetching the ID fails
            }
          );
        });
      },
      (error) => {
        this.toastr.error('Erreur lors du chargement des offres.', 'Erreur');
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
      // Logique de déconnexion (si nécessaire)
      this.router.navigate(['/logout']);
    }
}