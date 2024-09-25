import { Injectable } from '@angular/core';
import { produit } from '../produit';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';

import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Commande } from '../commande';
import { Livraison } from '../livraison';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  private baseUrl: string = 'http://localhost:8000/api';
  private commande = `${this.baseUrl}/commandes/`;
  private apiUrlLivraisons = `${this.baseUrl}/livraisons/`; 

  private apiUrlArticle = `${this.baseUrl}/articles/`;
  private apiUrlArticlesearch = `${this.baseUrl}/search_Article/`;
  constructor(private http: HttpClient) {}


  getAllLivraisons(): Observable<Livraison[]> {
    return this.http.get<Livraison[]>(this.apiUrlLivraisons);
  }



  
  searchArticle(type: string, query: string): Observable<any[]> {
    let params = new HttpParams();
    if (type && query) {
      params = params.set('searchType', type).set('query', query);
    }
    return this.http.get<any[]>(`${this.apiUrlArticlesearch}`, { params });
  }
  
  
  
  getAllCommandes(): Observable<Commande[]> {
    return this.http.get<Commande[]>(`${this.commande}`);
  }

  getArticleById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrlArticle}${id}/`);
  }


  updateArticleQuantiteFinale(CDE_PROD: string, STOCK_PROD : number): Observable<any> {
    const url = `${this.apiUrlArticle}${CDE_PROD}/update-quantite-finale/`;
    return this.http.put(url, { STOCK_PROD : STOCK_PROD  });
  }
  updateArticle(id: string, data: any): Observable<any> {
    const url = `${this.apiUrlArticle}${id}/`;
    return this.http.put(url, data);
  }
  deleteArticle(id: string): Observable<any> {
    const url = `${this.apiUrlArticle}${id}/`;
    return this.http.delete(url);
  }


  getArticles(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlArticle);
  }

  getLastArticleRef(): Observable<{ lastRef: string }> {
    return this.http.get<{ lastRef: string }>(`${this.apiUrlArticle}last-ref/`);
  }


  
  addArticle(article: any): Observable<any> {
    return this.http.post<any>(this.apiUrlArticle, article)
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
          let errorMessage = 'Une erreur est survenue lors de la tentative d\'ajout de l\'article. Veuillez réessayer.';
          if (error.error) {
            errorMessage = error.error;
          }
          return throwError(errorMessage);
        })
      );
  }

}
