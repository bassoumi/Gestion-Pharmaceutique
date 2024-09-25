import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  private apiUrl = 'http://localhost:8000/api/patients/'; 
  private searchUrl = 'http://localhost:8000/api/search-patients/';
  constructor(private http: HttpClient) { }

  getPatients(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getPatient(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${id}/`);
  }

  addPatient(patient: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, patient);
  }

  updatePatient(id: number, patient: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${id}/`, patient);
  }

  deletePatient(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}${id}/`);
  }
  searchPatients(params: HttpParams): Observable<any[]> {
    return this.http.get<any[]>(this.searchUrl, { params });
  }
  
  
}
