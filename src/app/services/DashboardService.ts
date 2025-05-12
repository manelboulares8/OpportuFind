// services/dashboard.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost:8090/opportufind/api/admin/dashboard';

  constructor(private http: HttpClient) { }

  getStats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/stats`);
  }

  getBySecteur(): Observable<any> {
    return this.http.get(`${this.apiUrl}/by-secteur`);
  }

  getRecruitmentTrend(): Observable<any> {
    return this.http.get(`${this.apiUrl}/recruitment-trend`);
  }
}