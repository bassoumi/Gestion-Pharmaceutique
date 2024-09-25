import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Livraison } from '../livraison';
import { Commande } from '../commande'; 

@Injectable({
  providedIn: 'root'
})
export class LivraisionService {

  private baseUrl: string = 'http://localhost:8000/api';
  private apiUrlfournisseur = `${this.baseUrl}/fournisseurs/`;

  private apiUrlArticle = `${this.baseUrl}/articles/`;
  private apiUrlQuantiteCommandes = `${this.baseUrl}/updateQuantiteCommandes/`;
  private apiUrlLivraisons_cherche = `${this.baseUrl}/search_livraison/`;
  private apiUrlLivraisons = `${this.baseUrl}/livraisons/`; 
  private apiUrlCommandes = `${this.baseUrl}/commandes/`; 
  private apiurllastCommande = 'http://localhost:8000/api/last-num-commande/'; 

  private commandeData: any;

  constructor(private http: HttpClient, private router: Router) {}


  updateQuantiteCommandes(lignes: any[]): Observable<any> {
    const apiUrlQuantiteCommandes = `${this.baseUrl}/updateQuantiteCommandes/`;  
    return this.http.post(apiUrlQuantiteCommandes, JSON.stringify(lignes), {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    });
  }
  
  





  getArticles(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlArticle);
  }
  updateArticleStock(lignes: any[]): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/update_stock_stock/`, { livraisons: [{ lignes }] });
  }
  
  createAvoirLots(avoirLots: any[]): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/avoirlots/create/`, { avoirLots });
}

  getAllLivraisons(): Observable<Livraison[]> {
    return this.http.get<Livraison[]>(this.apiUrlLivraisons);
  }
  getAllFournisseurs(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlfournisseur);
  }




  navigateToPrintPageCommande(): void {
    this.router.navigate(['/print-page']);
  }
  navigateToPrintPageLivraison(): void {
    this.router.navigate(['/print-livraison-page']);
  }

  // Créer une nouvelle livraison
  createLivraison(livraison: Livraison): Observable<Livraison> {
    return this.http.post<Livraison>(this.apiUrlLivraisons, livraison);
  }

  // Sauvegarder les données de livraison localement
  setLivraisonData(livraisonData: any): void {
    localStorage.setItem('livraisonData', JSON.stringify(livraisonData));
  }

  // Définir les données de commande
  setCommandeData(data: any) {
    this.commandeData = data;
  }

  // Récupérer les données de commande
  getCommandeData() {
    return this.commandeData;
  }

  // Récupérer le dernier numéro de commande
  getLastNumCommande(): Observable<number> {
    return this.http.get<number>(this.apiurllastCommande);
  }

  // Récupérer toutes les commandes
  getAllCommandes(): Observable<Commande[]> {
    return this.http.get<Commande[]>(this.apiUrlCommandes);
  }

  // Récupérer une commande par son ID
  getCommandeById(commandeId: number): Observable<Commande> {
    const url = `${this.apiUrlCommandes}/${commandeId}/`;
    return this.http.get<Commande>(url);
  }
  deleteLivraisonByNum(NUM_LIV: number): Observable<any> {
    const url = `${this.apiUrlLivraisons}${NUM_LIV}/`;
    return this.http.delete(url);
  }
  


  searchlivraison(NUM_LIV: string | number): Observable<any[]> {
    let params = new HttpParams();
    if (NUM_LIV) {
      const numCommandeNum = typeof NUM_LIV === 'string' ? parseInt(NUM_LIV, 10) : NUM_LIV;
      params = params.set('NUM_LIV', numCommandeNum.toString());
    }
    return this.http.get<any[]>(this.apiUrlLivraisons_cherche, { params });
  }

}

