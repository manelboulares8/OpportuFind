import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8090/opportufind/auth';
  private staticAdmin = {
    email: 'admin@admin.com',
    password: 'admin123',
    role: 'ADMIN',
    id: 0
  };
  constructor(private http: HttpClient,private router: Router) {}

  login(credentials: { email: string, password: string }): Observable<string> {
     if (
      credentials.email === this.staticAdmin.email &&
      credentials.password === this.staticAdmin.password
    ) {
      // Stocke manuellement les infos de l'admin
      localStorage.setItem('userId', this.staticAdmin.id.toString());
      localStorage.setItem('role', this.staticAdmin.role);
      localStorage.setItem('token', 'admin-token'); // token fictif
      return of('admin-token');
    }
    const params = new HttpParams()
      .set('email', credentials.email)
      .set('password', credentials.password);
  
    // Set the responseType to 'text' since the backend returns the token as plain text
    return this.http.post<string>('http://localhost:8090/opportufind/auth/login', null, {
      params,  // Send email and password as URL parameters
      responseType: 'text' as 'json'  // Expecting plain text (JWT token)
    });
  }
  
  
  
  
  /*signUp(user: any, userType: string): Observable<any> {
    const registerUrl = `${this.apiUrl}/register/${userType}`;
    return this.http.post<any>(registerUrl, user);
  }*/
    signUp(user: any, userType: string): Observable<any> {
      const registerUrl = `${this.apiUrl}/register/${userType}`;
      return this.http.post<any>(registerUrl, user);
    } 
 
    logout() {
      localStorage.clear(); // supprime tout ce qui est dans localStorage
      this.router.navigate(['/authentification']); // redirection vers la page de login
    }
}