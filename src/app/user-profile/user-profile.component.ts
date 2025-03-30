import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../../model/user.model';


@Component({
  selector: 'app-user-profile',
  standalone: false,
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  user!: User;
  userRole: 'entrepreneur' | 'etudiant' = 'entrepreneur'; // Default role

  constructor(private userService: UserService) {}
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
  

  updateProfile() {
    console.log('Profil mis à jour :', this.user);
    alert('Profil mis à jour avec succès !');
  }
}