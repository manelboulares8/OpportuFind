import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { User } from '../../model/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    userRole: 'entrepreneur' | 'etudiant' = 'entrepreneur';
  
  constructor(private http: HttpClient) {}

  // Fetch the user profile based on role
  getUserProfile(): Observable<any> {
    // Retrieve token from local storage
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found in local storage');
      return of({ message: 'No token found' });
    }
  
    const decodedToken = this.decodeJwtToken(token); // Decode the token
    const role = decodedToken.role;
    console.log(role);
  
    const id = decodedToken.id;
  
    // Fetch user data based on role
    if (role === 'ROLE_ENTREPRENEUR') {
      return this.http.get(`http://localhost:8090/opportufind/api/entrepreneurs/${id}`).pipe(
        map((userData: any) => ({ ...userData, role })) // Add role to the user data
      );
    } else if (role === 'ROLE_ETUDIANT') {
      return this.http.get(`http://localhost:8090/opportufind/api/etudiants/${id}`).pipe(
        map((userData: any) => ({ ...userData, role })) // Add role to the user data
      );
    } else {
      return of({ message: 'Role not supported yet' });
    }
  }
  
  // Decode the token and extract the role and other details
  private decodeJwtToken(token: string): { id: number, role: string } {
    if (!token) {
      console.error('No token provided');
      return { id: -1, role: '' };  // Return default value
    }

    // Split the JWT token into three parts
    const parts = token.split('.');

    if (parts.length !== 3) {
      console.error('Invalid token format');
      return { id: -1, role: '' };  // Return default value
    }

    // The payload is the second part of the token (index 1)
    const payload = parts[1];

    // Decode the base64url encoded payload
    const decodedPayload = this.base64UrlDecode(payload);

    // Parse the decoded payload into JSON
    const parsedPayload = JSON.parse(decodedPayload);

    // Return the user ID and role from the decoded payload
    return {
      id: parsedPayload.id,
      role: parsedPayload.role
    };
  }

  // Base64 URL decode function
  private base64UrlDecode(base64Url: string): string {
    // Add necessary padding for base64 encoding
    const padding = '='.repeat((4 - base64Url.length % 4) % 4);
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/') + padding;

    // Decode base64 string and return it
    return decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  }
  updateUserProfile(updatedUser: any): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found in local storage');
      return of({ message: 'No token found' });
    }

    const decodedToken = this.decodeJwtToken(token); // Decode the token
    const role = decodedToken.role;

    // Send the updated user data to the appropriate endpoint based on role
    if (role === 'ROLE_ENTREPRENEUR') {
      return this.http.put(`http://localhost:8090/opportufind/api/entrepreneurs`, updatedUser);
    } else if (role === 'ROLE_ETUDIANT') {
      return this.http.put(`http://localhost:8090/opportufind/api/etudiants`, updatedUser);
    } else {
      return of({ message: 'Role not supported for update' });
    }
  }
    getAllEtudiants(): Observable<User[]> {
    return this.http.get<User[]>(`http://localhost:8090/opportufind/api/etudiants`);
  }
  getAllEntrepreneurs(): Observable<User[]> {
    return this.http.get<User[]>(`http://localhost:8090/opportufind/api/entrepreneurs`);
  }
  
}
