import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8090/opportufind2/auth';

  constructor(private http: HttpClient) {}

  login(credentials: { email: string, password: string }): Observable<string> {
    const params = new HttpParams()
      .set('email', credentials.email)
      .set('password', credentials.password);
  
    // Set the responseType to 'text' since the backend returns the token as plain text
    return this.http.post<string>('http://localhost:8090/opportufind2/auth/login', null, {
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
}