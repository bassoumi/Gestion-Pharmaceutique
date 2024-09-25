import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {
  private apiUrl = 'http://localhost:8000/api/patients/'; 
  private apiUrl1 = 'http://localhost:8000/api/last-demande/';
  private apiUrl2 = 'http://localhost:8000/api/demandes/';
  private updateStockUrl = 'http://localhost:8000/api/update_stock/';
  private baseUrl = 'http://localhost:8000/api/lots/';
  private baseUrl1 = 'http://localhost:8000/api';
  private apiUrl_distrubition = 'http://localhost:8000/api/ligne-distributions/'; 
  private apiUrl_demande = 'http://localhost:8000/api/demandes/'; 
  private searchUrl = 'http://localhost:8000/api/ligne-distributions/search/'; 
  private lignesdemande = 'http://localhost:8000/api/lignes-demande/';

  constructor(private http: HttpClient) { }


  
  getPatients(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  getLastDemande(): Observable<any> {
    return this.http.get<any>(this.apiUrl1);
  }

  createDemande(demande: any): Observable<any> {
    return this.http.post<any>(this.apiUrl2, demande);
  }
  updateStock(stockData: any): Observable<any> {
    return this.http.post<any>(this.updateStockUrl, stockData);
  }
  getAllLots(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
  updateLot(lotUpdateData: any): Observable<any> {
    return this.http.put(`${this.baseUrl1}/update-lot/`, lotUpdateData);
  }
  
  saveUsedLots(usedLots: any[]): Observable<any> {
    return this.http.post<any>(`${this.baseUrl1}/save-used-lots/`, usedLots);
  }

  getLigneDistributions(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl_distrubition);
  }

  getDemandes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl_demande);
  }
  searchLignes(params: HttpParams): Observable<any[]> {
    return this.http.get<any[]>(`${this.searchUrl}`, { params });
  }
  addLigneDemande(ligneData: any): Observable<any> {
    return this.http.post<any>(`${this.lignesdemande}`, ligneData);
  }
  
}
