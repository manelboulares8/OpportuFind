import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8090/opportufind2/auth';

  constructor(private http: HttpClient) {}

  login(credentials: { email: string, password: string }): Observable<any> {
    const params = new HttpParams()
      .set('email', credentials.email)
      .set('password', credentials.password);
  
    // Use responseType: 'text' to tell Angular not to expect a JSON response
    return this.http.post<any>('http://localhost:8090/opportufind2/auth/login', null, { 
      params, 
      responseType: 'text' as 'json' // Telling Angular to treat the response as a plain text string
    });
  }
  
  
  /*signUp(user: any, userType: string): Observable<any> {
    const registerUrl = `${this.apiUrl}/register/${userType}`;
    return this.http.post<any>(registerUrl, user);
  }*/
    signUp(user: any, userType: string): Observable<any> {
      const registerUrl = `${this.apiUrl}/register/${userType}`;
      const formattedUser = {
        full_name: user.fullName,
        email: user.email,
        university: user.university,
        parcours: user.parcours,
        cv_url: user.cvUrl,
        password: user.password
      };
      return this.http.post<any>(registerUrl, formattedUser);
    }
}