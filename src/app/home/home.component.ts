import { Component, AfterViewInit, OnInit } from '@angular/core';
import { User } from '../../model/user.model';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule], // ✅ Ajout de CommonModule

})

export class HomeComponent implements AfterViewInit, OnInit{


  
  ngAfterViewInit() {
    // Initialisation du Owl Carousel
    $('.owl-carousel').owlCarousel({
      loop: true,
      margin: 10,
      nav: true,
      autoplay: true,
      autoplayTimeout: 5000,
      items: 1
    });
  }
  
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
  constructor(private userService: UserService,private router: Router) {}

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
goToProfile(){
  this.router.navigate(['/profile']);

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
