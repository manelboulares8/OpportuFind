// entreprenuer.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Offre } from '../../model/offre.model';

@Injectable({
  providedIn: 'root'
})
export class EntrepreneurService {

  private apiUrl = 'http://localhost:8090/opportufind/api/entrepreneurs'; // Your backend URL

  constructor(private http: HttpClient) { }

  
  getEntrepreneurById(idEntrepreneur: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${idEntrepreneur}`);
  }
}