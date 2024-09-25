import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../users.service';
import { Commande } from '../commande';
import { Router } from '@angular/router';
import { CommandeService } from '../service-commande/commande.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { produit } from '../produit';
import { ProduitService } from '../produit-service/produit.service';

@Component({
  selector: 'app-ligne-de-commande',
  templateUrl: './ligne-de-commande.component.html',
  styleUrls: ['./ligne-de-commande.component.css']
})
export class LigneDeCommandeComponent implements OnInit {
  debounceTimeInMs = 100; 
  isSidebarOpen: boolean = false;

  searchType: string = 'CDE_PROD'; // Valeur par défaut
  searchQuery: string = '';
  articleQuantities: { [num_article: string]: number } = {};
    filteredCdeProdList: string[] = [];
    patients: any[] = [];
    lots: any[] = [];
    patientNotFound: boolean = false;

    selectedPatient: string = '';

    dernierNumDemande: number = 0;
  debounceTimer: any; 
  commandeForm: FormGroup;
  ligneCommandeCounter: number = 1;
  username: string | null = '';
  fournisseurs: any[] = [];
  articles: any[] = [];
  commandes: Commande[] = [];
  searchQueryName: string = '';
  searchQueryLibProd: string = ''; 
  errorMessage: string = ''; 
  searchResults: any[] = [];
  allArticles: any[] = []; 
  selectedFournisseur: string | null = null;
  dernierNumCommande: string = '';

  constructor(private fb: FormBuilder, private CommandeService: CommandeService, private router: Router,private ProduitService : ProduitService) {
    const today = new Date().toISOString().substring(0, 10); 
    this.commandeForm = this.fb.group({
      DATE_COM: [today, Validators.required],
      CDE_FOUR: ['', Validators.required],
      OBSE: [''],
            ETAT: ['', Validators.required],
      user: [{ value: '', disabled: true }, Validators.required],
      lignes: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.getAllCommandes();
    this.getArticles();
    this.getAllFournisseurs();
    this.username = localStorage.getItem('username');
    if (this.username) {
      this.commandeForm.get('user')?.setValue(this.username);
    }
    this.commandeForm.get('CDE_FOUR')?.valueChanges.subscribe(value => {
      this.selectedFournisseur = value;
      console.log('Fournisseur :', this.selectedFournisseur);
      // this.filterArticlesByFournisseur();
    });
  }

  get lignes(): FormArray {
    return this.commandeForm.get('lignes') as FormArray;
  }
  getAllCommandes(): void {
    this.CommandeService.getAllCommandes().subscribe({
      next: (data) => {
        console.log('tous les commandes', data);
        this.commandes = data;
        if (this.commandes.length > 0) {
          // Chercher la commande avec le plus grand NUM_COM
          let dernierNumero = Math.max(...this.commandes.map(c => {
            let numCom: number | undefined = c.NUM_COM;
            return numCom !== undefined ? parseInt(numCom.toString(), 10) : NaN;
          }).filter(n => !isNaN(n)));
          if (!isNaN(dernierNumero)) {
            this.dernierNumCommande = (dernierNumero + 1).toString();
          } else {
            this.dernierNumCommande = '1';
          }
        } else {
          this.dernierNumCommande = '1';
        }
        console.log('Dernier numéro de commande :', this.dernierNumCommande);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des commandes :', error);
      }
    });
  }
  
  

  addLigne(): void {
    const ligneFormGroup = this.fb.group({
      NUM_COM: this.dernierNumCommande,
      CDE_PROD: ['', Validators.required],
      LIB_PROD: ['', Validators.required],
      QTE_STOCK: ['', Validators.required],
      PRIX_COM_UNITAIRE: ['', [Validators.required, Validators.pattern("^[0-9]*\\.?[0-9]+$")]],
      QTE_COM: [1, [Validators.required, Validators.pattern("^[0-9]+$"), Validators.min(1)]],
      QTE_COM_TOTALE: [{ value: 1, disabled: true }], 
      TOT_COM: [{ value: 0, disabled: true }],
      error: [null]  
    });

    this.lignes.push(ligneFormGroup);

    ligneFormGroup.get('QTE_COM')?.valueChanges.subscribe(value => {
      ligneFormGroup.get('QTE_COM_TOTALE')?.setValue(value);
    });

    ligneFormGroup.get('CDE_PROD')?.valueChanges
  
  }

  removeLigne(index: number): void {
    this.lignes.removeAt(index);
    this.ligneCommandeCounter = 1;
  }


  onSubmit(): void {
    if (this.commandeForm.invalid) {
      console.log('Le formulaire n\'est pas valide');
      this.commandeForm.markAllAsTouched();
      return;
    }
    
    const commandeData = this.commandeForm.getRawValue();
    if (!commandeData.OBSE.trim()) {
      commandeData.OBSE = 'Aucune observation';
    }

    commandeData.totalPrix = this.totalPrixTotal();
    
    console.log('Données du formulaire:', JSON.stringify(commandeData));
    
    this.CommandeService.createCommande(commandeData).subscribe({
      next: (result) => {
        console.log('Données de la commande:', commandeData.lignes);
        this.ngOnInit();
        console.log('Commande ajoutée avec succès:', result);
        
        commandeData.NUM_COM = this.dernierNumCommande;
        this.router.navigate(['/liste-des-Commandes']);
      },
      error: (error) => {
        console.error('Erreur lors de l\'ajout de la commande:', error);
      }
    });
  }

  
/* 
  updateArticleQuantities(lignes: any[]): void {
    lignes.forEach(ligne => {
      const numArticle = ligne.CDE_PROD;
      const quantiteCommandee = +ligne.QTE_COM;
      const article = this.allArticles.find(a => a.CDE_PROD === numArticle);

      if (article) {
        const quantiteFinale = article.QTE_COM + quantiteCommandee;
        this.CommandeService.updateArticleQuantiteFinale(numArticle, quantiteFinale).subscribe({
          next: (response) => {
            console.log(`Quantité finale de l'article ${numArticle} mise à jour avec succès`);
          },
          error: (error) => {
            console.log('tttttt',numArticle,quantiteFinale)
            console.error(`Erreur lors de la mise à jour de la quantité finale de l'article ${numArticle} :`, error);
          }
        });
      }
    });
  } */

  getAllFournisseurs(): void {
    this.CommandeService.getAllFournisseurs().subscribe({
      next: (data) => {
        this.fournisseurs = data;
        console.log('Fournisseurs:', this.fournisseurs);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des fournisseurs :', error);
      }
    });
  }

  articlesInStockOut: any[] = []; 
  articlesInStock: any[] = [];

  getArticles(): void {
    this.CommandeService.getArticles().subscribe({
      next: (data) => {
        console.log('Données reçues:', data); 
        this.allArticles = data;
        console.log('tous les articles:', this.allArticles);
        this.articlesInStockOut = this.allArticles.filter(article => article.STOCK_PROD === 0);
        this.articlesInStock = this.allArticles.filter(article => article.STOCK_PROD > 0).sort((a, b) => a.LIB_PROD.localeCompare(b.LIB_PROD));
        console.log('Articles en rupture de stock:', this.articlesInStockOut);
        console.log('Autres articles:', this.articlesInStock);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des articles :', error);
      }
    });
  }
  
  
  sortArticles(articles: any[]): any[] {
    return articles.sort((a, b) => (a.STOCK_PROD === 0 ? -1 : 1) - (b.STOCK_PROD === 0 ? -1 : 1));
  }
/* 
  onCodeChange(i: number, event: Event): void {
    const code = (event.target as HTMLInputElement).value;
    console.log('Code produit entré:', code); // Debug: affiche le code entré par l'utilisateur
  
    if (!code) {
      console.log('Aucun code produit entré');
      this.lignes.at(i).patchValue({
        LIB_PROD: ''
      });
      return;
    }
  
    // Recherche de l'article correspondant
    const article = this.articles.find(a => a.CDE_PROD === code);
  
    if (article) {
      console.log('Article trouvé:', article); // Debug: affiche l'article trouvé
      this.lignes.at(i).patchValue({
        LIB_PROD: article.LIB_PROD
      });
    } else {
      console.log('Aucun article trouvé pour le code:', code); // Debug: affiche si aucun article n'est trouvé
      this.lignes.at(i).patchValue({
        LIB_PROD: ''
      });
    }
  } */

  onCodeChange(index: number, event: Event): void {
    const code = (event.target as HTMLInputElement).value.trim().toUpperCase();
    console.log('Code produit entré:', code);

    // Implémentation du debouncing
    this.debounceCodeChange(index, code);
  }
  debounceCodeChange(index: number, code: string) {
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.handleCodeChange(index, code);
    }, this.debounceTimeInMs);
  }

  handleCodeChange(index: number, code: string) {
    console.log('Articles disponibles:', this.allArticles);
    console.log('Recherche du code:', code);
  
    if (!code) {
      this.lignes.at(index).patchValue({
        LIB_PROD: '',
        CDE_PROD: '',
        PRIX_COM_UNITAIRE: '',
        QTE_STOCK: '',
        TOT_COM: '',
        error: null
      });
      return;
    }
  
    const articleAlreadySelected = this.isArticleAlreadySelected(code, index);
  
    if (articleAlreadySelected) {
      this.lignes.at(index).get('error')?.setValue(`L'article avec le code "${code}" est déjà sélectionné.`);
      
      return;
    }
  
    const article = this.allArticles.find(a => a.CDE_PROD.trim().toUpperCase() === code);
    console.log('Article trouvé:', article);
  
    if (article) {
      console.log('Article trouvé:', article);
      this.lignes.at(index).patchValue({
        LIB_PROD: article.LIB_PROD,
        CDE_PROD: article.CDE_PROD,
        PRIX_COM_UNITAIRE: article.PRI_VENT_PROD,
        QTE_STOCK: article.STOCK_PROD
      });
  
      const initialQuantite = this.lignes.at(index).get('QTE_COM')?.value || 0;
      const initialTotalPrice = article.PRI_VENT_PROD * initialQuantite;
      this.lignes.at(index).get('TOT_COM')?.setValue(initialTotalPrice);
  
      this.lignes.at(index).get('QTE_COM')?.valueChanges.subscribe(() => {
        this.updateTotalPrice(index);
      });
  
      this.lignes.at(index).get('error')?.setValue(null);
    } else {
      console.log('Aucun article trouvé pour le code:', code);
      this.lignes.at(index).patchValue({
        LIB_PROD: '',
        CDE_PROD: '',
        PRIX_COM_UNITAIRE: '',
        QTE_STOCK: '',
        TOT_COM: ''
      });
      this.lignes.at(index).get('error')?.setValue(`Aucun article trouvé pour le code "${code}".`);
    }
  }
  
  
  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  resetSearch(): void {
    this.searchResults = [];
    this.searchQueryName = '';
  }
  
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

  isArticleAlreadySelected(articleName: string, currentIndex: number): boolean {
    return this.lignes.controls
      .filter((control, index) => index !== currentIndex) 
      .some(control => control.get('LIB_PROD')?.value === articleName);
  }
  
  updateTotalPrice(index: number): void {
    const PRIX_COM = parseFloat(this.lignes.at(index).get('PRIX_COM_UNITAIRE')?.value);
    const QTE_COM = parseFloat(this.lignes.at(index).get('QTE_COM')?.value);
    const totalPrice = PRIX_COM * QTE_COM;
    this.lignes.at(index).get('TOT_COM')?.setValue(totalPrice.toFixed(3)); 
  }
  

  totalPrixTotal(): number {
    let totalPrix = 0;
    this.lignes.controls.forEach((ligne: AbstractControl) => {
      const prixTotal = parseFloat(ligne.get('TOT_COM')?.value);
      if (prixTotal) {
        totalPrix += prixTotal;
      }
    });
    return parseFloat(totalPrix.toFixed(3)); 
  }
  

  truncateText(text: string, maxLength: number = 10): string {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  }



}

// Dans votre fichier TypeScript du composant




/*   filterArticlesByFournisseur(): void {
    if (this.selectedFournisseur) {
      const fournisseur = this.fournisseurs.find(f => f.ref_fournisseur === this.selectedFournisseur);
      
      if (fournisseur) {
        this.articles = this.allArticles.filter(article => article.nom_fournisseur === fournisseur.nom_fournisseur);
        console.log('Articles filtrés par fournisseur :', this.articles);
      } else {
        console.warn(`Aucun fournisseur trouvé pour ref_fournisseur ${this.selectedFournisseur}`);
        this.articles = []; 
      }
    }
  }

  onFournisseurSelect(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    console.log('Fournisseur sélectionné :', selectedValue);
    this.commandeForm.get('ref_fournisseur')?.setValue(selectedValue);
    this.selectedFournisseur = selectedValue;
    this.filterArticlesByFournisseur();
  } 
  */
