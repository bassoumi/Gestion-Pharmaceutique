import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Commande } from '../commande';
import { ProduitService } from '../produit-service/produit.service';
import { Livraison } from '../livraison';
import { produit } from '../produit';

@Component({
  selector: 'app-liste-des-article',
  templateUrl: './liste-des-article.component.html',
  styleUrls: ['./liste-des-article.component.css']
})
export class ListeDesArticleComponent implements OnInit {
  articles: produit[] = [];
  commandes: Commande[] = [];
  searchQueryName: string = '';
  errorMessage: string = ''; 
  searchResults: any[] = [];
  articleQuantities: { [num_article: string]: number } = {};
  livraisons: Livraison[] = [];
  isLoading: boolean = true; 


  constructor(private fb: FormBuilder, private ProduitService: ProduitService, private router: Router) {}

  ngOnInit(): void {
    this.loadData();
    setTimeout(() => {
      this.isLoading = false;
    }, 300); 
  }
  

  loadData(): void {
    this.ProduitService.getAllCommandes().subscribe({
      next: (commandes) => {
        console.log('les commandes :', commandes);
        this.commandes = commandes;

        this.ProduitService.getArticles().subscribe({
          next: (articles) => {
            const articlesOutOfStock = articles.filter(article => article.STOCK_PROD === 0);

            if (articlesOutOfStock.length > 0) {
              this.errorMessage = `Les articles avec les codes de produit suivants sont en rupture de stock : "${articlesOutOfStock.map(article => article.CDE_PROD).join(', ')}"`;
            } else {
              this.errorMessage = ''; 
            }

            this.articles = articles.sort((a, b) => {
              const refA = a.CDE_PROD ? parseInt(a.CDE_PROD.replace(/AR/, ''), 10) : 0;
              const refB = b.CDE_PROD ? parseInt(b.CDE_PROD.replace(/AR/, ''), 10) : 0;
              return refB - refA; 
            });
            console.log('Articles triés :', this.articles);

            this.getAllLivraisons(); 
          },
          error: (error) => {
            console.error('Erreur lors de la récupération des articles :', error);
          }
        });
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des commandes :', error);
      }
    });
  }

  
  

  getAllLivraisons(): void {
    this.ProduitService.getAllLivraisons().subscribe({
      next: (data) => {
        console.log('Données récupérées:', data);
  
        this.livraisons = data.sort((a, b) => {

          const numA = a.NUM_LIV ? parseInt(a.NUM_LIV, 10) : 0;
          const numB = b.NUM_LIV ? parseInt(b.NUM_LIV, 10) : 0;
          return numB - numA; 
        });
  
        console.log('Livraisons triées:', this.livraisons);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des livraisons :', error);
      }
    });
  }


  deleteArticle(id: string): void {
    this.ProduitService.deleteArticle(id).subscribe({
      next: () => {
        console.log('Article supprimé avec succès');
        this.loadData();
      },
      error: (error) => {
        console.error('Erreur lors de la suppression de l\'article :', error);
      }
    });
  }
  searchType: string = 'CDE_PROD'; 
  searchQuery: string = '';  
  onSearch(event: Event): void {
    event.preventDefault();
    this.searchQuery = this.searchQuery.trim();
  
    if (this.searchQuery === '') {
      return;
    }
  
    console.log('Type de recherche:', this.searchType);
    console.log('Requête de recherche:', this.searchQuery);
  
    this.ProduitService.searchArticle(this.searchType, this.searchQuery).subscribe(
      (data: any[]) => {
        console.log('Résultats de la recherche:', data);
        this.searchResults = data;
      },
      (error) => {
        console.error('Erreur de recherche', error);
      }
    );
  }
  
  

  resetSearch(): void {
    this.searchResults = [];
    this.searchQuery = '';
  }

  modify(id: string): void {
    this.router.navigate(['/update-Article', id]);
  }
}

