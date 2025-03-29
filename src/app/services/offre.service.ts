import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Offre } from '../../model/offre.model';

@Injectable({
  providedIn: 'root'
})
export class OffreService {
  private apiUrl = 'http://localhost:8090/opportufind2/api/offres'; // Remplace par ton URL backend

  constructor(private http: HttpClient) {}

  ajouterOffre(offre: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/ajouter`, offre);
  }

  getOffres(): Observable<Offre[]> {
    return this.http.get<Offre[]>(this.apiUrl);
  }

  // Méthode pour supprimer une offre
  deleteOffre(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getOffreById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Mettre à jour une offre
  updateOffre(id: number, offreDetails: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, offreDetails);
  }
  getOffresByEntrepreneur(id: number): Observable<Offre[]> {
    return this.http.get<Offre[]>(`${this.apiUrl}/entrepreneur/${id}`);
  }
  getEntrepreneurIdByOfferId(idOffre: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/displayEntrepreneurId/${idOffre}`);
  }
}