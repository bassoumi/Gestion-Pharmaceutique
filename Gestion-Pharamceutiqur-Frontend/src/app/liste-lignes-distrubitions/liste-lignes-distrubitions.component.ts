import { Component, OnInit } from '@angular/core';
import { DemandeService } from '../demande-service/demande.service';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { PatientsService } from '../patient-services/patients.service';

@Component({
  selector: 'app-liste-lignes-distrubitions',
  templateUrl: './liste-lignes-distrubitions.component.html',
  styleUrls: ['./liste-lignes-distrubitions.component.css']
})
export class ListeLignesDistrubitionsComponent implements OnInit {
  demandes: any[] = [];
  allLignesDistribution: any[] = [];
  filteredLignesDistribution: any[] = [];
  searchValue: string = '';
  errorMessage: string = '';
  searchType: string = 'N_DEMANDE'; 
  patients: any[] = [];

  constructor(private demandeService: DemandeService, private router: Router,private PatientsService: PatientsService,) {}

  ngOnInit(): void {
    this.loadData();
  
  }


  private loadData(): void {
    this.demandeService.getDemandes().subscribe(demandes => {
      this.demandes = demandes.sort((a, b) => {
        const numA = a.N_DEMANDE ? parseInt(a.N_DEMANDE, 10) : 0;
        const numB = b.N_DEMANDE ? parseInt(b.N_DEMANDE, 10) : 0;
        return numB - numA;
      });
      console.log('demandes',demandes)

      this.loadLignesDistribution();
    });
  }



  public getLignesDistributionForDemande(nDemande: number): any[] {

    return this.filteredLignesDistribution
      .find(demande => demande.N_DEMANDE === nDemande)?.lignes || [];
  }

  public getCodeProd(lignes: any[], index: number): string {
    // Vérifier si le code_prod est disponible pour la ligne actuelle
    if (lignes[index].code_prod) {
      return lignes[index].code_prod;
    } else {
      // Vérifier s'il existe une ligne suivante et retourner son code_prod
      if (index + 1 < lignes.length && lignes[index + 1].code_prod) {
        return lignes[index + 1].code_prod;
      }
      // Vérifier s'il existe une ligne précédente et retourner son code_prod
      if (index - 1 >= 0 && lignes[index - 1].code_prod) {
        return lignes[index - 1].code_prod;
      }
      // Retourner 'même produit' si aucune ligne suivante ou précédente n'a de code_prod
      return 'même produit';
    }
  }
  
  onSearch(event: Event): void {
    event.preventDefault();
  
    console.log(`Type de recherche: ${this.searchType}`);
    console.log(`Valeur de recherche: ${this.searchValue}`);
  
    let params = new HttpParams();
  
    // Ajoutez les paramètres de recherche en fonction du type sélectionné
    if (this.searchType === 'ID_UNIQUE') {
      params = params.set('ID_UNIQUE', this.searchValue);
    } else if (this.searchType === 'N_DEMANDE') {
      params = params.set('N_DEMANDE', this.searchValue);
    }
  
    // Appelez le service pour obtenir les données
    this.demandeService.searchLignes(params).subscribe({
      next: (data) => {
        if (data.length === 0) {
          this.errorMessage = 'Aucune ligne de distribution trouvée pour les critères donnés';
          this.filteredLignesDistribution = [];
        } else {
          this.errorMessage = '';
          this.filteredLignesDistribution = data.map(demande => ({
            ...demande,
            lignes: this.allLignesDistribution.filter(ligne => ligne.num_dem === demande.N_DEMANDE)
          }));
        }
        console.log('Résultats de la recherche:', this.filteredLignesDistribution);
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors de la recherche des lignes de distribution';
        console.error('Erreur lors de la recherche:', error);
        this.filteredLignesDistribution = [];
      }
    });
  }
  
  
  private loadLignesDistribution(): void {
    this.demandeService.getLigneDistributions().subscribe(lignes => {
      this.allLignesDistribution = lignes.sort((a, b) => {
        const numA = a.num_dem ? parseInt(a.num_dem, 10) : 0;
        const numB = b.num_dem ? parseInt(b.num_dem, 10) : 0;
        return numB - numA;
      });
      console.log('allLignesDistribution',this.allLignesDistribution)
      this.updateFilteredLignesDistribution();
    });
  }

  private updateFilteredLignesDistribution(): void {
    this.filteredLignesDistribution = this.demandes.map(demande => ({
      ...demande,
      lignes: this.allLignesDistribution.filter(ligne => ligne.num_dem === demande.N_DEMANDE)
    }));
  }
  

  print(demande: any): void {
    const lignesDistPourDemande = this.getLignesDistributionForDemande(demande.N_DEMANDE);
    if (demande && lignesDistPourDemande.length > 0) {
      const prixTotal = this.calculateTotalPrice(lignesDistPourDemande);
      const demandeData = {
        ...demande,
        lignesDistribution: lignesDistPourDemande,
        prixTotal
      };
      localStorage.setItem('demandeData', JSON.stringify(demandeData));
      this.router.navigate(['/print-demande-page']);
    }
  }

  private calculateTotalPrice(lignes: any[]): number {
    return lignes.reduce((total, ligne) => total + (parseFloat(ligne.prix_dist) || 0), 0);
  }

  public getFormattedSommePrix(demandeId: number): string {
    const sommePrix = this.getSommePrix(demandeId);
    return sommePrix.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  private getSommePrix(demandeId: number): number {
    return this.allLignesDistribution
      .filter(ligne => ligne.num_dem === demandeId)
      .reduce((total, ligne) => total + (parseFloat(ligne.prix_dist) || 0), 0);
  }

  resetSearch(): void {
    this.searchValue = '';
    this.errorMessage='';
    this.filteredLignesDistribution = [];
  }


  loadPatients(): void {
    this.PatientsService.getPatients().subscribe({
      next: (data) => {
        // Trier les patients par ID_UNIQUE du plus grand au plus petit
        this.patients = data.sort((a, b) => b.ID_UNIQUE - a.ID_UNIQUE);
        console.log('Patients récupérés et triés:', this.patients); // Vérifiez les données récupérées et triées
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du chargement des patients : ' + error.message;
  
        console.error('Erreur lors de la récupération des patients :', error);
      }
    });
  }


}
