import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../../model/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-entrepreneurs',
  standalone: false,
  templateUrl: './entrepreneurs.component.html',
  styleUrl: './entrepreneurs.component.css'
})
export class EntrepreneursComponent {
   entrepreneurs: User[] = [];

    constructor(
      private router: Router,
      private toastr: ToastrService,
      private entrepreneurService: UserService
    ) {}

  ngOnInit(): void {
    this.entrepreneurService.getAllEntrepreneurs().subscribe(
      (data) => this.entrepreneurs = data,
      (error) => console.error('Erreur de chargement des étudiants', error)
    );
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
