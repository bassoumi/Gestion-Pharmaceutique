import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';

import { Commande } from './commande';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl: string = 'http://localhost:8000/api';
  private commande = `${this.baseUrl}/commandes/`;
  private url: string = `${this.baseUrl}/users/`;
  private apiUrlfournisseur = `${this.baseUrl}/fournisseurs/`;
  private apiUrlArticle = `${this.baseUrl}/articles/`;
  private apiUrlfacturesearch = `${this.baseUrl}/search_Facture/`;

  private apiUrlcommande = `${this.baseUrl}/commandes/`;


  private apiUrlDemande = `${this.baseUrl}/leave_requests/`;
  private apiUrl1 = this.baseUrl;
  private apiUrl = `${this.baseUrl}/token/`;
  private checkSuperUserUrl = `${this.baseUrl}/check_superuser/`;

  constructor(private http: HttpClient, private router: Router) {}


  
  getArticles(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlArticle);
  }

  updateArticleQuantiteFinale(numArticle: string, quantite: number): Observable<any> {
    const url = `${this.apiUrlArticle}${numArticle}/update-quantite-finale/`;
    return this.http.put(url, { quantite: quantite });
  }


  isSuperUser: boolean = false;
  isAuthenticated: boolean = false;

  getAllCommandes(): Observable<Commande[]> {
    return this.http.get<Commande[]>(`${this.commande}`);
  }
 
  navigateToPrintPageCommandes() {
    this.router.navigate(['/print-commande-page']);
  }

  
  deleteCommandeByNum(NUM_COM: number): Observable<any> {
    const url = `${this.apiUrlcommande}${NUM_COM}/`;
    return this.http.delete(url);
  }

  searchFacture(NUM_COM: string | number): Observable<any[]> {
    let params = new HttpParams();
    if (NUM_COM) {
      const numCommandeNum = typeof NUM_COM === 'string' ? parseInt(NUM_COM, 10) : NUM_COM;
      params = params.set('NUM_COM', numCommandeNum.toString());
    }
    return this.http.get<any[]>(this.apiUrlfacturesearch, { params });
  }

  getAllFournisseurs(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlfournisseur);
  }


 addUser(data: any): Observable<any> {
    const formData = new FormData();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        formData.append(key, data[key]);
      }
    }
    return this.http.post<any>(this.url, formData);
  }

  
  logAction(action: string, user: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/log_action/`, { action, user });
  }


  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { username, password }).pipe(
      tap(response => {
        console.log('Login response:', response);  
        localStorage.setItem('access_token', response.access);
        localStorage.setItem('refresh_token', response.refresh);
        if (response.user_image) {
          localStorage.setItem('user_image', response.user_image); 
        }
      }),
      catchError(error => {
        console.error('Login failed', error);
        return throwError(error);
      })
    );
  }
  logout(refreshToken: string) {
    return this.http.post(`${this.apiUrl1}/logout/`, { refresh: refreshToken });
  }

  getToken(): string {
    return localStorage.getItem('access_token') || '';
  }



  checkSuperUser(): Observable<{ is_superuser: boolean }> {
    const token = localStorage.getItem('access_token');
    if (!token) {
      return throwError('Token not found');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<{ is_superuser: boolean }>(this.checkSuperUserUrl, { headers }).pipe(
      tap(response => {
        this.isSuperUser = response.is_superuser;
      }),
      catchError(error => {
        console.error('Error checking superuser status:', error);
        return throwError(error);
      })
    );
  }

  checkAuthenticated(): Observable<void> {
    const token = localStorage.getItem('access_token');
    if (!token) {
      return of(undefined);
    }
    return this.http.get<{ is_superuser: boolean }>(this.checkSuperUserUrl)
      .pipe(
        map(response => {
          this.isSuperUser = response.is_superuser;
          this.isAuthenticated = true;
        }),
        catchError(() => {
          this.isAuthenticated = false;
          return of(undefined);
        })
      );
  }
  
}
