import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { Fournisseur } from '../fournisseur';


@Injectable({
  providedIn: 'root'
})
export class FournisseurService {
  private baseUrl: string = 'http://localhost:8000/api';
  private apiUrlfournisseursearch = `${this.baseUrl}/search_fournisseur/`;
  private apiUrlfournisseur = `${this.baseUrl}/fournisseurs/`;

  constructor(private http: HttpClient, private router: Router) {}



  getAllFournisseurs(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlfournisseur);
  }



  
  getLastFournisseurRef(): Observable<string> {
    return this.http.get<string>('http://localhost:8000/api/fournisseurs/last-ref')
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Erreur lors de la récupération de la dernière référence fournisseur :', error);
          return throwError('Erreur lors de la récupération de la dernière référence fournisseur.');
        })
      );
  }
  
  deleteFournisseur(id: string): Observable<any> {
    const url = `${this.apiUrlfournisseur}${id}/`;
    return this.http.delete(url);
  }


    ajouterFournisseur(data: Fournisseur): Observable<any> {
      return this.http.post<any>(this.apiUrlfournisseur, data)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            if (error.error instanceof ErrorEvent) {
              console.error('Une erreur s\'est produite :', error.error.message);
            } else {
              console.error(
                `Erreur ${error.status}, ` +
                `Détails : ${JSON.stringify(error.error)}`
              );
            }
            let errorMessage = 'Une erreur est survenue lors de la tentative d\'ajout du fournisseur. Veuillez réessayer.';
            if (error.error) {
              errorMessage = error.error;
            }
            return throwError(errorMessage);
          })
        );
    }
  
  updateFournisseur(id: string, data: Fournisseur): Observable<any> {
    const url = `${this.apiUrlfournisseur}${id}/`;
    return this.http.put(url, data);
  }
  
  getFournisseurById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrlfournisseur}${id}/`);
  }
  searchFournisseur(CDE_FOUR: string): Observable<any[]> {
    let params = new HttpParams();
    if (CDE_FOUR) {
      params = params.set('CDE_FOUR', CDE_FOUR);
    }
    return this.http.get<any[]>(`${this.apiUrlfournisseursearch}`, { params });
  }
}
