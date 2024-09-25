import { Component } from '@angular/core';
import { DemandeService } from '../demande-service/demande.service';
import { LivraisionService } from '../service-livraison/livraision.service';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { PatientsService } from '../patient-services/patients.service';


@Component({
  selector: 'app-dashbored',
  templateUrl: './dashbored.component.html',
  styleUrls: ['./dashbored.component.css']
})
export class DashboredComponent  {
  demandes: any[] = [];
  allLignesDistribution: any[] = [];
  filteredLignesDistribution: any[] = [];
  searchValue: string = '';
  errorMessage: string = '';
  allArticles: any[] = [];
  rotationChartData: any[] = []; 
  articlesChartData: any[] = [];  // Propriété pour les données du graphique des articles
  lignesDistributionChartData: any[] = [];
  valeursTotales: any[] = [];
  patients: any[] = [];
  patientProgressionChartData: any[] = [];
  colorSchemeArticles: Color = {
    name: 'articles',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: [  '#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', 
    '#FF5733', '#33FF57', '#3357FF', '#FF33A1', 
    '#FF8C00', '#7CFC00', '#00CED1', '#FF00FF', 
    '#800080', '#8B0000', '#808000', '#00FF7F'] // Couleurs pour les articles
  };
  
  colorSchemeDistribution: Color = {
    name: 'distribution',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', 
    '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', 
    '#bcbd22', '#17becf', '#aec7e8', '#ffbb78', 
    '#98df8a', '#ff9896'] // Couleurs pour la distribution
  };
  
  colorSchemePatients: Color = {
    name: 'patients',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#9467bd', '#8c564b', '#e377c2', '#7f7f7f'] // Couleurs pour les patients
  };
  
  
  constructor(private demandeService: DemandeService,private livraisonService: LivraisionService,private PatientsService: PatientsService,){}
  
  ngOnInit(): void {
    this.loadData();
    this. getArticles();
    this.loadPatients();
  }

  private loadData(): void {
    this.demandeService.getDemandes().subscribe(demandes => {
      this.demandes = demandes.sort((a, b) => {
        const numA = a.N_DEMANDE ? parseInt(a.N_DEMANDE, 10) : 0;
        const numB = b.N_DEMANDE ? parseInt(b.N_DEMANDE, 10) : 0;
        return numB - numA;
      });
      console.log('demandes', demandes);
  
      this.loadLignesDistribution();
    
    });
  }
  
  private loadLignesDistribution(): void {
    this.demandeService.getLigneDistributions().subscribe(lignes => {
      this.allLignesDistribution = lignes.sort((a, b) => {
        const numA = a.num_dem ? parseInt(a.num_dem, 10) : 0;
        const numB = b.num_dem ? parseInt(b.num_dem, 10) : 0;
        return numB - numA;
      });
      console.log('allLignesDistribution', this.allLignesDistribution);
  
      this.prepareLignesDistributionData();
    });
  }
  
  getArticles(): void {
    this.livraisonService.getArticles().subscribe({
      next: (data) => {
        console.log(data);
        this.allArticles = data; 
        this.prepareArticlesData(); 
        console.log('allArticles', this.allArticles);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des articles :', error);
      }
    });
  }
  prepareArticlesData(): void {
    const articlesData = this.allArticles.map(article => {
      return {
        name: article.CDE_PROD,
        value: article.STOCK_PROD
      };
    });
    this.articlesChartData = articlesData;
    console.log('articlesChartData', this.articlesChartData);  // Vérifiez ici
  }
  

  loadPatients(): void {
    this.PatientsService.getPatients().subscribe({
      next: (data) => {
        // Trier les patients par ID_UNIQUE du plus grand au plus petit
        this.patients = data.sort((a, b) => b.ID_UNIQUE - a.ID_UNIQUE);
        console.log('Patients récupérés et triés:', this.patients); // Vérifiez les données récupérées et triées
        
        // Préparer les données pour le graphique
        this.preparePatientProgressionData(this.patients);
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du chargement des patients : ' + error.message;
        console.error('Erreur lors de la récupération des patients :', error);
      }
    });
  }
  


  prepareLignesDistributionData(): void {
    const distributionData = this.allLignesDistribution.reduce((acc, ligne) => {
      const codeProd = ligne.code_prod;
      acc[codeProd] = acc[codeProd] || { name: codeProd, value: 0 };
      acc[codeProd].value += parseFloat(ligne.qte_lot);
      return acc;
    }, {});
  
    this.lignesDistributionChartData = Object.values(distributionData);
    console.log('lignesDistributionChartData', this.lignesDistributionChartData);  // Vérifiez ici
  }

  preparePatientProgressionData(patients: any[]): void {
    const dateCounts: { [key: string]: number } = {};

    // Compter le nombre de patients pour chaque date
    patients.forEach(patient => {
        if (patient.DATE_SUBMIT) {
            const dateSubmit = patient.DATE_SUBMIT.split('T')[0]; // Extraire uniquement la date
            if (dateCounts[dateSubmit]) {
                dateCounts[dateSubmit]++;
            } else {
                dateCounts[dateSubmit] = 1;
            }
        } else {
            console.warn('DATE_SUBMIT est undefined ou mal formaté pour ce patient', patient);
        }
    });

    // Préparer les données du graphique sans inversion de l'axe des Y
    this.patientProgressionChartData = [
        {
            name: 'Progression des Patients',
            series: Object.keys(dateCounts)
                .map(date => ({
                    name: date,
                    value: dateCounts[date]  // Utiliser la vraie valeur
                }))
                .sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime()) // Tri croissant des dates
        }
    ];

    console.log('patientProgressionChartData', this.patientProgressionChartData);

    if (!this.patientProgressionChartData[0].series.length) {
        console.error('Aucune donnée valide pour patientProgressionChartData');
    }
}




}
  

