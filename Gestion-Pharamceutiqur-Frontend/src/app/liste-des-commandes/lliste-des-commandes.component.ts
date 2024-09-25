import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import { Commande } from '../commande';

@Component({
  selector: 'app-les-facture',
  templateUrl: './liste-des-commandes.components.html',
  styleUrls: ['./liste-des-commandes.component.css']
})
export class LesFactureComponent {
  commandes: Commande[] = [];
  commandeData: any;
  searchQuerynumber: string = '';
  searchResults: any[] = [];
  somePriceVariable: string = '123,456';
  constructor(private userService: UsersService, private router: Router) {}

  

  ngOnInit(): void {
    this.getAllCommandes();
  }

  getAllCommandes(): void {
    this.userService.getAllCommandes().subscribe({
      next: (data) => {
        console.log(data);
  
        this.commandes = data.sort((a, b) => {
          const numA = (a.NUM_COM ?? 0).toString();
          const numB = (b.NUM_COM ?? 0).toString();
          const parsedNumA = parseInt(numA, 10);
          const parsedNumB = parseInt(numB, 10);
          return parsedNumB - parsedNumA; 
        });
  
        this.commandes.forEach(commande => {
          commande.totalPrix = this.calculateTotalPrix(commande.lignes);
          console.log('Total price for commande:', commande.totalPrix);
        });
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des commandes :', error);
      }
    });
  }
  
  
  
  

  calculateTotalPrix(lignes: any[]): number {
    return lignes.reduce((sum, ligne) => {
      const TOT_COM = parseFloat(ligne.TOT_COM);
      console.log('Adding prix_total:', TOT_COM);
      return sum + TOT_COM;
    }, 0);
  }

  print(commande: Commande): void {
    const NUM_COM = commande.NUM_COM;
    if (NUM_COM) {
      this.commandeData = {
        NUM_COM: NUM_COM,
        CDE_FOUR: commande.CDE_FOUR,
        DATE_COM: commande.DATE_COM,
        OBSE: commande.OBSE,
        ETAT: commande.ETAT,
        
        lignes: commande.lignes,
        totalPrix: this.calculateTotalPrix(commande.lignes)
      };
      localStorage.setItem('commandeData', JSON.stringify(this.commandeData));
      console.log(this.commandeData);
      this.userService.navigateToPrintPageCommandes();
    }
  }

  deleteCommande(NUM_COM?: number): void {
    if (NUM_COM !== undefined) {
      console.log(NUM_COM);
      this.userService.deleteCommandeByNum(NUM_COM).subscribe({
        next: () => {
          this.getAllCommandes();
        },
        error: (error) => {
          console.error('Erreur lors de la suppression de la commande :', error);
        }
      });
    } else {
      console.error('Numéro de commande non défini.');
    }
  }
  isQuantiteZero(qteCom: string | null): boolean {
    return Number(qteCom) === 0;
  }
  

  onSearch(event: Event): void {
    event.preventDefault();
    this.userService.searchFacture(this.searchQuerynumber).subscribe(
      (data: any[]) => {
        console.log('Search results:', data);
        this.searchResults = data.sort((a, b) => {
          const numA = parseInt(a.lignes[0]?.NUM_COM, 10);
          const numB = parseInt(b.lignes[0]?.NUM_COM, 10);
          return numB - numA;
        });
        this.searchResults.forEach(commande => {
          commande.totalPrix = this.calculateTotalPrix(commande.lignes);
          console.log('Total price for search result commande:', commande.totalPrix);
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
}
