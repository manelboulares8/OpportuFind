import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OffreService } from '../services/offre.service';
import { ToastrService } from 'ngx-toastr'; // Si tu utilises Toastr pour les notifications
import { UserService } from '../services/user.service';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-modifier-offre',
  standalone: false,
  templateUrl: './modifier-offre.component.html',
  styleUrl: './modifier-offre.component.css'
})
export class ModifierOffreComponent implements OnInit{
  jobPostForm: FormGroup;
  offreId!: number;

  constructor(
    private route: ActivatedRoute,
    private offreService: OffreService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private userService:UserService
  ) {
    this.jobPostForm = this.fb.group({
      titre: ['', Validators.required],
      exigences: ['', Validators.required],
      localisation: ['', Validators.required],
      date: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

 
    user!: User;
    userRole: 'entrepreneur' | 'etudiant' = 'entrepreneur'; // Default role
     ngOnInit(): void {
      this.offreId = +this.route.snapshot.paramMap.get('id')!; // Récupérer l'ID de l'URL
    this.loadOffreDetails(this.offreId);
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

  // Charger les détails de l'offre dans le formulaire
  loadOffreDetails(id: number): void {
    this.offreService.getOffreById(id).subscribe(
      data => {
        this.jobPostForm.patchValue({
          titre: data.titre,
          exigences: data.exigences,
          localisation: data.localisation,
          date: data.date,
          description: data.description
        });
      },
      error => {
        this.toastr.error('Erreur lors du chargement des détails de l\'offre.');
      }
    );
  }

  // Fonction pour soumettre le formulaire
  onFormSubmit(): void {
    if (this.jobPostForm.invalid) {
      return;
    }
    const updatedOffre = this.jobPostForm.value;
    this.offreService.updateOffre(this.offreId, updatedOffre).subscribe(
      response => {
        this.toastr.success('Offre modifiée avec succès');
        this.router.navigate(['/lister-offre']); // Rediriger vers la liste des offres
      },
      error => {
        this.toastr.error('Erreur lors de la modification de l\'offre');
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