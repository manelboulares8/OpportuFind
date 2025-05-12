import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../../model/user.model';
import { EntrepreneurService } from '../services/entrepreneur.service';
import { OffreService } from '../services/offre.service';
import { ToastrService } from 'ngx-toastr';
import { Offre } from '../../model/offre.model';
import { CandidatureService } from '../services/CandidatureService';
import { retry } from 'rxjs/operators';
import { Candidature } from '../../model/Candidature.model';

@Component({
  selector: 'app-job-detail',
  standalone: false,
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {
  offer: Offre | null = null;
  isLoading = true;
  entrepreneurName: string = '';
  applicationForm: FormGroup;
  selectedFile: File | null = null;
  user!: User;
  isEditMode = false;
  candidatureToEdit: Candidature | null = null;
  userRole: 'entrepreneur' | 'etudiant' = 'entrepreneur';
  candidatureCvUrl: string | null = null;


  constructor(
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute,
    private offreService: OffreService,
    private entrepreneurService: EntrepreneurService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private candidatureService: CandidatureService,

  ) {
    this.applicationForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      coverLetter: [''], // This must exist

    });
  }
  // In your component class
loadCandidature(id: number): void {
    this.candidatureService.getCandidatureById(id).subscribe({
      next: (candidature) => {
        this.candidatureToEdit = candidature;
        console.log('Loaded candidature:', candidature); // Debug log
        this.candidatureCvUrl = candidature.cvUrl ? this.cleanCvUrl(candidature.cvUrl) : null;

        // Make sure user data is loaded before initializing form
        if (this.user) {
          this.initializeFormWithCandidature(candidature);
        } else {
          // If user data isn't loaded yet, wait for it
          this.userService.getUserProfile().subscribe(user => {
            this.user = user;
            this.initializeFormWithCandidature(candidature);
          });
        }
      },
      error: (err) => {
        console.error('Error loading candidature', err);
        this.toastr.error('Failed to load application data', 'Error');
      }
    });
}
  loadUserProfile(): void {
    this.userService.getUserProfile().subscribe({
      next: (data) => {
        this.user = data;
        if (data.role === 'ROLE_ENTREPRENEUR') {
          this.userRole = 'entrepreneur';
        } else if (data.role === 'ROLE_ETUDIANT') {
          this.userRole = 'etudiant';
        }
        this.prefillFormIfStudent();
      },
      error: (err) => {
        console.error('Error loading user profile:', err);
      }
    });
  }
initializeFormWithCandidature(candidature: Candidature): void {
  // Make sure form is created
  if (!this.applicationForm) {
    this.applicationForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      coverLetter: ['']
    });
  }

  // Patch form values
  this.applicationForm.patchValue({
    fullName: this.user.fullName,
    email: this.user.email,
    coverLetter: candidature.coverLetter || ''
  });

  // If you want to show the existing CV
  if (candidature.cvUrl) {
    this.user.cvUrl = this.cleanCvUrl(candidature.cvUrl);
  }
}
cleanCvUrl(rawUrl: string): string {
  // If it's a fake path, return just the filename
  if (rawUrl.includes('fakepath')) {
    return rawUrl.split('\\').pop() || 'uploaded_cv.pdf';
  }
  return rawUrl;
}

// In your ngOnInit, ensure proper ordering:
ngOnInit(): void {
  this.route.queryParams.subscribe(params => {
    this.isEditMode = params['editMode'] === 'true';
    
    if (this.isEditMode) {
      const candidatureId = localStorage.getItem('candidatureToEdit');
      if (candidatureId) {
        this.loadCandidature(Number(candidatureId));
        localStorage.removeItem('candidatureToEdit');
      }
    }
  });

  const offerId = this.route.snapshot.paramMap.get('id');
  if (offerId) {
    this.loadOfferDetails(+offerId);
  } else {
    this.toastr.error('Invalid offer ID', 'Error');
    this.isLoading = false;
  }

  // Load user profile after checking edit mode
  this.loadUserProfile();
}

  /* ngOnInit(): void {
     this.route.queryParams.subscribe(params => {
      this.isEditMode = params['editMode'] === 'true';
      
      if (this.isEditMode) {
        const candidatureId = localStorage.getItem('candidatureToEdit');
        if (candidatureId) {
          this.loadCandidature(Number(candidatureId));
          localStorage.removeItem('candidatureToEdit');
        }
      }
    });
    
    const offerId = this.route.snapshot.paramMap.get('id');
    
    if (offerId) {
      this.loadOfferDetails(+offerId);
    } else {
      this.toastr.error('Invalid offer ID', 'Error');
      this.isLoading = false;
    }

    this.loadUserProfile();
  }
  

  loadUserProfile(): void {
    this.userService.getUserProfile().subscribe({
      next: (data) => {
        this.user = data;
        if (data.role === 'ROLE_ENTREPRENEUR') {
          this.userRole = 'entrepreneur';
        } else if (data.role === 'ROLE_ETUDIANT') {
          this.userRole = 'etudiant';
        }
        this.prefillFormIfStudent();
      },
      error: (err) => {
        console.error('Error loading user profile:', err);
      }
    });
  }
 loadCandidature(id: number): void {
    this.candidatureService.getCandidatureById(id).subscribe({
      next: (candidature) => {
        this.candidatureToEdit = candidature;
        // Pré-remplissez votre formulaire avec ces données
        this.initializeFormWithCandidature(candidature);
      },
      error: (err) => {
        console.error('Erreur chargement candidature', err);
      }
    });
  }
  initializeFormWithCandidature(candidature: Candidature): void {
  this.applicationForm.patchValue({
    fullName: this.user.fullName,
    email: this.user.email,
    coverLetter: candidature.coverLetter || ''
  });
  
  // Si vous gérez le CV dans le formulaire
  if (candidature.cvUrl) {
    // Gestion du CV existant
  }
} */

  prefillFormIfStudent(): void {
    if (this.userRole === 'etudiant') {
      this.applicationForm.patchValue({
        fullName: this.user.fullName,
        email: this.user.email
      });
    }
  }
  getCvName(cvUrl: string): string {
    // Extract filename from URL (simple version)
    return cvUrl.split('/').pop() || 'my_cv.pdf';
  }
  
// Keep your existing onFileSelected method
onFileSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.selectedFile = input.files[0];
  }
}

loadOfferDetails(offerId: number): void {
  this.isLoading = true;

  this.offreService.getOffreById(offerId).pipe(
    retry(2)
  ).subscribe({
    next: (response) => {
      if (response) {
        this.offer = response;
        this.loadEntrepreneurDetails(this.offer!); // Type sûr ici
      } else {
        console.warn('Réponse vide.');
        this.offer = null;
      }
      this.isLoading = false;
    },
    error: (error) => {
      console.error('Erreur lors du chargement de l\'offre :', error);
      this.toastr.error('Échec du chargement de l\'offre', 'Erreur');
      this.offer = null;
      this.isLoading = false;
    }
  });
}


  loadEntrepreneurDetails(offer: Offre): void {
    this.offreService.getEntrepreneurIdByOfferId(offer.idOffre).subscribe({
      next: (entrepreneurId) => {
        this.entrepreneurService.getEntrepreneurById(entrepreneurId).subscribe({
          next: (entrepreneur) => {
            this.entrepreneurName = entrepreneur?.fullName || 'Unknown';
          },
          error: () => {
            this.entrepreneurName = 'Unknown';
          }
        });
      },
      error: () => {
        this.entrepreneurName = 'Unknown';
      }
    });
  }
  private get userId(): number | null {
    const id = localStorage.getItem('userId');
    return id ? +id : null; // The + converts string to number
  }
  onApply(): void {
    // 1. Get the offer ID from the route and convert to number
    const offerId = Number(this.route.snapshot.paramMap.get('id'));
    
    // 2. Debug initial state
    console.log('[Debug] Route offer ID:', offerId);
    console.log('[Debug] Current userId:', this.userId);
  
    // 3. Validate application

  
    // 4. Ensure we have all required data
    if (isNaN(offerId)) {
      console.error('Invalid offer ID from route');
      this.toastr.error('Invalid job offer');
      return;
    }
  
    if (!this.userId) {
      console.error('Missing user ID');
      this.toastr.error('Please log in to apply');
      return;
    }
  
    // 5. Prepare payload - using the offer object's ID for consistency
    const payload = {
      idOffre: this.offer?.idOffre || offerId, // Prefer the loaded offer's ID
      idEtudiant: this.userId,
    };
  
    console.log('[Debug] Final payload:', payload);
  
    // 6. Submit application
    this.candidatureService.createCandidature(payload).subscribe({
      next: (response) => {
        console.log('Application successful:', response);
        this.toastr.success('Application submitted successfully!');
      },
      error: (err) => {
        console.error('Application error:', {
          status: err.status,
          message: err.message,
          error: err.error
        });
        this.toastr.error(err.error?.message || 'Application failed');
      }
    });
  }
  
  private validateApplication(): boolean {
    // Check if offer is loaded
    if (!this.offer) {
      this.toastr.error('Offer details not loaded yet');
      return false;
    }
  
    // Check user role
    if (this.userRole !== 'etudiant') {
      this.toastr.error('Only students can apply');
      return false;
    }
  
    // Check user ID
    if (!this.userId) {
      this.toastr.error('User not identified');
      return false;
    }
  
    return true;
  }


  onSubmit(): void {
    if (this.applicationForm.invalid || !this.offer) {
      this.toastr.warning('Please fill all required fields', 'Warning');
      return;
    }

    const formData = new FormData();
    formData.append('offerId', this.offer.idOffre.toString());
    formData.append('fullName', this.applicationForm.value.fullName);
    formData.append('email', this.applicationForm.value.email);
    formData.append('coverLetter', this.applicationForm.value.coverLetter);
    
    if (this.selectedFile) {
      formData.append('cv', this.selectedFile);
    }


    // Here you would typically call your service to submit the application
    console.log('Form data prepared:', formData);
    // this.candidatureService.submitApplication(formData).subscribe(...);
    this.toastr.success('Application submitted successfully!', 'Success');
    this.applicationForm.reset();
  }
  onModify(): void {
    if (!this.candidatureToEdit?.idCandidature) {
        this.toastr.error('No application to modify', 'Error');
        return;
    }

    const formData = new FormData();
    formData.append('idCandidature', this.candidatureToEdit.idCandidature.toString());
    formData.append('coverLetter', this.applicationForm.value.coverLetter);
    
    if (this.selectedFile) {
        formData.append('cv', this.selectedFile);
    }

    /* this.candidatureService.updateCandidature(formData).subscribe({
        next: (response) => {
            this.toastr.success('Application updated successfully!', 'Success');
            this.router.navigate(['/mes-candidatures']); // Redirige vers la liste des candidatures
        },
        error: (err) => {
            console.error('Update error:', err);
            this.toastr.error(err.error?.message || 'Update failed', 'Error');
        }
    }); */
}

  // Navigation methods (keep your existing ones)
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