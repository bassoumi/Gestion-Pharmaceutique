import { Component } from '@angular/core';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';
import { LivraisionService } from '../service-livraison/livraision.service';
import { Livraison } from '../livraison';

@Component({
  selector: 'app-liste-des-livraisons',
  templateUrl: './liste-des-livraisons.component.html',
  styleUrls: ['./liste-des-livraisons.component.css']
})
export class ListeDesLivraisonsComponent {
  livraisons: Livraison[] = [];
  livraisonData: any;
  searchQuerynumber: string = '';
  searchResults: any[] = [];
  totalPrix: number = 0;

  constructor(private LivraisionService: LivraisionService, private router: Router) {}

  ngOnInit(): void {
    this.getAllLivraisons();
  }

  getAllLivraisons(): void {
    this.LivraisionService.getAllLivraisons().subscribe({
      next: (data) => {
  
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
  

  getTotalPrix(lignes: any[]): number {
    const totalPrix = lignes.reduce((sum, ligne) => {
      const prix = parseFloat(ligne.PRIX_LIV) || 0;
      return sum + prix;
    }, 0);
    
    return totalPrix;
  }
  
  print(livraison: Livraison): void {
    const NUM_LIV = livraison.NUM_LIV;
    if (NUM_LIV) {
      const totalPrix = this.getTotalPrix(livraison.lignes);
      
      this.livraisonData = {
        NUM_LIV: NUM_LIV,
        ARR_LIV: livraison.ARR_LIV,
        NUM_COM: livraison.NUM_COM,
        DAT_LIV: livraison.DAT_LIV,
        ETAT_LIV: livraison.ETAT_LIV,
        totalPrix: totalPrix,
        lignes: livraison.lignes,
     };
      localStorage.setItem('livraisonData', JSON.stringify(this.livraisonData));
      console.log(this.livraisonData);
      this.LivraisionService.navigateToPrintPageLivraison();
    }
  }  

  onSearch(event: Event): void {
    event.preventDefault();
    if (!this.searchQuerynumber) {
      console.error('Search query is empty.');
      return;
    }
    this.LivraisionService.searchlivraison(this.searchQuerynumber).subscribe(
      (data: any[]) => {
        console.log('Search results:', data);
        this.searchResults = data.sort((a, b) => {
          const numA = parseInt(a.lignes[0]?.NUM_LIV, 10);
          const numB = parseInt(b.lignes[0]?.NUM_LIV, 10);
          return numB - numA;
        });
      },
      (error) => {
        console.error('Search error', error);
      }
    );
  }
  

  resetSearch(): void {
    this.searchResults = [];
    this.searchQuerynumber = '';
  }


  deleteLivraison(NUM_LIV: number): void {
    if (NUM_LIV !== undefined) {
      console.log(NUM_LIV);
      this.LivraisionService.deleteLivraisonByNum(NUM_LIV).subscribe({
        next: () => {
          this.getAllLivraisons(); 
        },
        error: (error) => {
          console.error('Erreur lors de la suppression de la livraison :', error);
        }
      });
    } else {
      console.error('Numéro de livraison non défini.');
    }
  }
  
  
  
}
