import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-about',
  standalone: false,
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
constructor(private router: Router,private userService: UserService) {}

  goToJobList() {
    this.router.navigate(['/job-list']);
  }
  goToJobDetail() {
    this.router.navigate(['/job-detail']);
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
   
   user!: User;
   userRole: 'entrepreneur' | 'etudiant' | 'none' = 'none'; // Default role

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
    goToHome() {
      // Vérifie le rôle de l'utilisateur
      if (this.userRole === 'etudiant' || this.userRole === 'entrepreneur') {
        // Redirige vers /home si l'utilisateur a un rôle valide
        this.router.navigate(['/home']);
      } else {
        // Sinon, redirige vers /welcome
        this.router.navigate(['/welcome']);
      }
    }
    goToProfile(){
      this.router.navigate(['/profile']);
    
    }
}
