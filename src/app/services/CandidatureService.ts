import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Candidature } from '../../model/Candidature.model';

@Injectable({
  providedIn: 'root'
})
export class CandidatureService {
  private apiUrl = `http://localhost:8090/opportufind/api/candidatures`;

  constructor(private http: HttpClient) { }

  createCandidature(payload: { idOffre: number, idEtudiant: number }): Observable<Candidature> {
    return this.http.post<Candidature>(
      this.apiUrl, 
      payload,{
      responseType: 'json'}
    );
  }
  getCandidaturesByEtudiant(etudiantId: number): Observable<Candidature[]> {
    return this.http.get<Candidature[]>(`${this.apiUrl}/etudiant/${etudiantId}`);
  }

  // Get candidatures by entrepreneur ID (for all their offers)
  getCandidaturesByEntrepreneur(entrepreneurId: number): Observable<Candidature[]> {
    return this.http.get<Candidature[]>(`${this.apiUrl}/entrepreneur/${entrepreneurId}`);
  }
  
  deleteCandidature(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  updateCandidatureStatus(id: number, status: string, recruitmentDate?: string): Observable<any> {
    let params = new HttpParams().set('status', status);
    if (recruitmentDate) {
      params = params.set('recruitmentDate', recruitmentDate);
    }
  
    return this.http.put(`${this.apiUrl}/${id}/status`, null, { params });
  }
  getCandidatureById(id: number): Observable<Candidature> {
    return this.http.get<Candidature>(`${this.apiUrl}/${id}`);
}
getAllCandidatures(): Observable<Candidature[]> {
  return this.http.get<Candidature[]>(`${this.apiUrl}`);
}

}