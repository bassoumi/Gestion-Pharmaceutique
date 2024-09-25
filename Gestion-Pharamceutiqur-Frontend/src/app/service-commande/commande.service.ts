import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { Commande } from '../commande';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  private baseUrl: string = 'http://localhost:8000/api';
  private apiUrlfournisseur = `${this.baseUrl}/fournisseurs/`;

  private apiUrlcommande = `${this.baseUrl}/commandes/`;
  private apiurllastcommande = 'http://localhost:8000'; 
  private apiUrlArticle = `${this.baseUrl}/articles/`;
  private commandeData: any;
  private apiUrlCommande = `${this.baseUrl}/commande/`;
  private commande = `${this.baseUrl}/commandes/`;
  constructor(private http: HttpClient, private router: Router) {}


  setCommandeData(data: any) {
    this.commandeData = data;
  }
  

  getCommandeData() {
    return this.commandeData;
  }

  navigateToPrintPageCommandes() {
    this.router.navigate(['/print-commande-page']);
  }


  
  getArticles(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlArticle);
  }

  updateArticleQuantiteFinale(numArticle: string, quantite: number): Observable<any> {
    const url = `${this.apiUrlArticle}${numArticle}/update-quantite-finale/`;
    return this.http.put(url, { quantite: quantite });
  }

  deleteCommandeByNum(num_commande: number): Observable<any> {
    const url = `${this.apiUrlcommande}${num_commande}/`;
    return this.http.delete(url);
  }

  getLastNumCommande(): Observable<number> {
    return this.http.get<number>(`${this.apiurllastcommande}/api/last-num-commande/`);
  }
  getAllCommandes(): Observable<Commande[]> {
    return this.http.get<Commande[]>(`${this.commande}`);
  }

  getCommandes(): Observable<Commande[]> {
    return this.http.get<Commande[]>(this.apiUrlCommande);
  }

  getAllFournisseurs(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlfournisseur);
  }


 

  
  createCommande(commande: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<any>(this.apiUrlCommande, commande, httpOptions).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Erreur lors de l\'ajout de la commande :', error);
        return throwError('Une erreur est survenue lors de l\'ajout de la commande.');
      })
    );
  }

}
