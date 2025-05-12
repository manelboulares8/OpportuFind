import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../../model/user.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-profile',
  standalone: false,
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  user!: User;
  userRole: 'entrepreneur' | 'etudiant' = 'entrepreneur'; // Default role

  constructor(private userService: UserService,private router: Router) {}
  ngOnInit(): void {
    this.userService.getUserProfile().subscribe({
      next: (data) => {
        console.log('User data fetched:', data);
        this.user = data; // Store the user profile data
        console.log(data.role);
        if (data.idEtudiant) {
          localStorage.setItem('idEtudiant', data.idEtudiant);
          console.log('Stored idEtudiant in local storage:', data.idEtudiant);
        } else if (data.role === 'ROLE_ENTREPRENEUR') {
          localStorage.setItem('idEntrepreneur', data.idEntrepreneur.toString());
          console.log('Stored idEntrepreneur in local storage:', data.idEntrepreneur);
        }

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
  

  
  updateProfile() {
    console.log('Before update, checking user object:', this.user);
    let storedId: string | null = null;
    console.log(storedId);

    // Retrieve user id from local storage
    if (this.userRole === 'etudiant') {
      storedId = localStorage.getItem('idEtudiant');
      console.log(storedId);

    } else if (this.userRole === 'entrepreneur') {
      storedId = localStorage.getItem('idEntrepreneur');
      console.log(storedId);

    }    
    if (storedId) {
      // Convert the stored ID to a number and assign it to the user object
      if (this.userRole === 'etudiant') {
        this.user.id= Number(storedId);  // Use idEtudiant for 'etudiant' role
      } else {
        this.user.id = Number(storedId);  // Use id for 'entrepreneur' role
      }
      console.log('Retrieved user id from local storage:', this.user.id || this.user.id);
    } else {
      console.error('User ID is missing in local storage');
      alert('User ID is missing from local storage!');
      return;
    }
  
    // Check if the user object has all required fields based on role
    if (this.userRole === 'etudiant') {
      if (!this.user.id || !this.user.fullName || !this.user.email || !this.user.parcours || !this.user.cvUrl) {
        console.error('Missing user profile fields:', this.user);
        alert('Please ensure all fields are filled before submitting!');
        return;
      }
    } else if (this.userRole === 'entrepreneur') {
      if (!this.user.id || !this.user.fullName || !this.user.email || !this.user.secteur || !this.user.aboutUs) {
        console.error('Missing user profile fields:', this.user);
        alert('Please ensure all fields are filled before submitting!');
        return;
      }
    }
  
    console.log('Updating user profile:', this.user);
  
    // Prepare the body for the API request based on the role
    let updateBody: any = this.user;
  
    // For 'etudiant' role, use 'idEtudiant' in the body
    if (this.userRole === 'etudiant') {
      updateBody = {
        idEtudiant: this.user.id,
        fullName: this.user.fullName,
        email: this.user.email,
        university: this.user.university,
        parcours: this.user.parcours,
        cvUrl: this.user.cvUrl
      };
    }
    if (this.userRole === 'entrepreneur') {
      updateBody = {
        idEntrepreneur: this.user.id,
        fullName: this.user.fullName,
        email: this.user.email,
        localisation: this.user.localisation,
        secteur: this.user.secteur,
        aboutUs: this.user.aboutUs
      };
    }

    
  
    // Call the service method to update the profile
    this.userService.updateUserProfile(updateBody).subscribe({
      next: (updatedUser) => {
        console.log('Profile updated successfully:', updatedUser);
        alert('Profile updated successfully!');
      },
      error: (err) => {
        console.error('Error updating profile:', err);
        alert('Error updating the profile');
      }
    });
  }
  onFileChange(event: any): void {
    const file = event.target.files[0];  // Get the selected file
    if (file) {
      this.user.cvUrl = file.name;  // Set the file name to the cvUrl field
      console.log('Selected file:', file.name);  // Log the file name to the console
    }
  }
  goToLogout() {
    localStorage.clear(); // supprime tout ce qui est dans localStorage
    this.router.navigate(['/welcome']); // redirection vers la page de login
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


}