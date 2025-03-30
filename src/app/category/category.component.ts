import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../model/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-category',
  standalone: false,
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
 
constructor(private router: Router,private userService :UserService) {}

   user!: User;
   userRole: 'entrepreneur' | 'etudiant' = 'entrepreneur'; // Default role
    ngOnInit(): void {
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
