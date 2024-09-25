import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { LivraisionService } from '../service-livraison/livraision.service';
import { Router } from '@angular/router';
import { Livraison } from '../livraison';
import { ProduitService } from '../produit-service/produit.service';

@Component({
  selector: 'app-livraison',
  templateUrl: './livraison.component.html',
  styleUrls: ['./livraison.component.css']
})
export class LivraisonComponent implements OnInit {
  livraisonForm: FormGroup;
  username: string | null = '';
  errorMessage: string | null = null;
  isSidebarOpen: boolean = false;

  fournisseurs: any[] = [];
  articles: any[] = [];
  livraisons: Livraison[] = [];
  commandes: any[] = [];
  filteredCdeProdList: string[] = [];
  filter_CDE_FOUR: string = '';
  allArticles: any[] = [];
  selectedFournisseur: string | null = null;
  dernierNumLivraison: string = '';
  todayDate: string;
  totalQteLiv: number = 0; 
  qteCom: number = 0;

  constructor(private fb: FormBuilder, private livraisonService: LivraisionService, private router: Router,private ProduitService:ProduitService) {
    this.todayDate = new Date().toISOString().split('T')[0];

    const today = new Date().toISOString().substring(0, 10);
    
    this.livraisonForm = this.fb.group({  
      DAT_LIV: [today, Validators.required],
      NUM_COM: ['', Validators.required],
      ARR_LIV: ['', [Validators.required, this.dateFutureValidator]],
      ETAT_LIV: ['', Validators.required],
      CDE_FOUR: ['', Validators.required],
      NOM_FOUR: ['', Validators.required],
      NUM_LIV: this.dernierNumLivraison,
      lignes: this.fb.array([])
    });
  }
  dateFutureValidator(control: FormControl): { [key: string]: boolean } | null {
    const today = new Date().toISOString().split('T')[0];
    if (control.value < today) {
      return { 'dateFuture': true };
    }
    return null;
  }




 
  
  ngOnInit(): void {
    this.getAllCommandes();
    this.getAllLivraisons();
    this.getAllFournisseurs();

    this.getArticles();
    this.username = localStorage.getItem('username');
    if (this.username) {
      this.livraisonForm.get('user')?.setValue(this.username);
    }
    this.livraisonForm.get('NUM_COM')?.valueChanges.subscribe(value => {
      this.onNumComChange(value);
    });
  }


  
  get lignes(): FormArray {
    return this.livraisonForm.get('lignes') as FormArray;
  }
  static numberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (isNaN(value) || value === '') {
        return { invalidNumber: true };
      }
      return null;
    };
  }
  


  getNomFournisseur(cdeFour: string): string | undefined {
    const fournisseur = this.fournisseurs.find(f => f.CDE_FOUR === cdeFour);
    return fournisseur ? fournisseur.NOM_FOUR : 'Fournisseur inconnu';
  }
  
  

  getAllLivraisons(): void {
    this.livraisonService.getAllLivraisons().subscribe({
      next: (data) => {
        console.log('livraison', data);
        this.livraisons = data;
        if (this.livraisons.length > 0) {
          let dernierNumero = Math.max(
            ...this.livraisons.map(c => {
              let numLiv: number | undefined = parseInt(c.NUM_LIV, 10); 
              return !isNaN(numLiv) ? numLiv : NaN;
            }).filter(n => !isNaN(n))
          );
          this.dernierNumLivraison = !isNaN(dernierNumero) ? (dernierNumero + 1).toString() : '1';
        } else {
          this.dernierNumLivraison = '1';
        }
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des livraisons :', error);
      }
    });
  }
  checkLignesDates(): void {
    const lignesArray = this.livraisonForm.get('lignes') as FormArray;
    lignesArray.controls.forEach(control => {
      control.get('DATE_PER')?.updateValueAndValidity();
    });
  }




  addLigne(): void {
    const ligneFormGroup = this.fb.group({
      CDE_PROD: ['', Validators.required],
      DATE_PER: ['', [Validators.required, this.dateFutureValidator]],
      QTE_STOCK: ['', Validators.required],
      LIB_PROD: ['', Validators.required],
      QTE_LIV: ['', Validators.required],
      COND_PROD: ['', Validators.required],
      ARRIVAGE_LIV: ['', Validators.required],
      QTE_COM: ['', [Validators.required, Validators.min(1)]],
      PRIX_LIV: [{ value: '', disabled: true }, Validators.required],
      NUM_LOT: ['', Validators.required],
      error: ['']
    });

    this.lignes.push(ligneFormGroup);

    this.lignes.setValidators(this.qteLivValidator());
    this.lignes.updateValueAndValidity(); 

    ligneFormGroup.get('CDE_PROD')?.valueChanges.subscribe(() => {
      this.onCdeProdSelect(ligneFormGroup);
    });

    ligneFormGroup.get('QTE_LIV')?.valueChanges.subscribe(() => {
      this.calculatePrixLiv(ligneFormGroup);
    });
  }

  qteLivValidator(): ValidatorFn {
    return (formArray: AbstractControl): { [key: string]: any } | null => {
      if (!(formArray instanceof FormArray)) {
        return null;
      }
  
      const formArrayControls = formArray.controls as FormGroup[];
      const produitsMap: { [key: string]: { totalQteLiv: number, qteCom: number } } = {};
  
      formArrayControls.forEach(control => {
        control.setErrors(null);
      });
  
      for (const control of formArrayControls) {
        const cdeProd = control.get('CDE_PROD')?.value;
        const qteLiv = control.get('QTE_LIV')?.value;
        const qteCom = control.get('QTE_COM')?.value;
  
        if (cdeProd && qteLiv != null && qteCom != null) {
          if (!produitsMap[cdeProd]) {
            produitsMap[cdeProd] = { totalQteLiv: 0, qteCom };
          }
          produitsMap[cdeProd].totalQteLiv += qteLiv;
        }
      }
  
      for (const [cdeProd, { totalQteLiv, qteCom }] of Object.entries(produitsMap)) {
        if (totalQteLiv > qteCom) {
          const control = formArrayControls.find(ctrl => ctrl.get('CDE_PROD')?.value === cdeProd);
          if (control) {
            control.setErrors({ qteLivInvalid: `QTE_LIV  ${cdeProd} (${totalQteLiv}) dépasse QTE_COM(${qteCom})` });
          }
          return { qteLivInvalid: `QTE_LIV  ${cdeProd} (${totalQteLiv}) dépasse QTE_COM(${qteCom})` };
        }
      }
  
      return null;
    };
  }
  
  
  

  
  calculatePrixLiv(ligne: FormGroup): void {
    const cdeProd = ligne.get('CDE_PROD')?.value;
    const quantite = ligne.get('QTE_LIV')?.value;
    
    if (cdeProd && quantite > 0) {
      const article = this.allArticles.find(a => a.CDE_PROD === cdeProd);
      if (article) {
        const prixAchat = parseFloat(article.PRI_ACHT_PROD);
        if (!isNaN(prixAchat)) {
          const prixLiv = prixAchat * quantite;
          const prixLivFormatted = parseFloat(prixLiv.toFixed(3));
          ligne.get('PRIX_LIV')?.setValue(prixLivFormatted);
        } else {
          console.error('PRI_ACHT_PROD is not a valid number:', article.PRI_ACHT_PROD);
          ligne.get('PRIX_LIV')?.setValue(0);
        }
      } else {
        console.warn('Article not found for CDE_PROD:', cdeProd);
        ligne.get('PRIX_LIV')?.setValue(0);
      }
    } else {
      ligne.get('PRIX_LIV')?.setValue(0);
    }
  }
  

  removeLigne(index: number): void {
    this.lignes.removeAt(index);
  }

  
  updateStockForArticles(lignes: any[]): void {
    this.livraisonService.updateArticleStock(lignes).subscribe({
      next: (response) => {
        console.log('Stock mis à jour pour les articles', response);
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour du stock:', error);
      }
    });
  }
  

  getAllCommandes(): void {
    this.livraisonService.getAllCommandes().subscribe({
      next: (data) => {
        this.commandes = data.filter(commande => 
          commande.lignes.every(ligne => parseFloat(ligne.QTE_COM) > 0)
        );
  
        this.commandes = this.commandes.sort((a, b) => 
          (b.NUM_COM ?? 0) - (a.NUM_COM ?? 0)
        );
  
        console.log('Toutes les commandes filtrées et triées:', this.commandes);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des commandes :', error);
      }
    });
  }
  
  getArticles(): void {
    this.livraisonService.getArticles().subscribe({
      next: (data) => {
        console.log(data);
        this.articles = data;
        this.allArticles = data; 
        this.articlesInStockOut = this.allArticles.filter(article => article.STOCK_PROD === 0);
        this.articlesInStock = this.allArticles.filter(article => article.STOCK_PROD > 0).sort((a, b) => a.LIB_PROD.localeCompare(b.LIB_PROD));
        this.filteredCdeProdList = data.map(article => article.CDE_PROD);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des articles :', error);
      }
    });
  }
  

  truncateText(text: string, maxLength: number = 10): string {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  }

  onArticleSelect(index: number, event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
  
    if (selectedValue) {
      console.log('CDE_PROD sélectionné :', selectedValue);
  
      const selectedArticle = this.articles.find(article => article.CDE_PROD === selectedValue);
  
      if (selectedArticle) {
        this.lignes.at(index).patchValue({
          QTE_STOCK: selectedArticle.STOCK_PROD,
          LIB_PROD: selectedArticle.LIB_PROD,
          COND_PROD: selectedArticle.COND_PROD
        });
        console.log('Quantité de stock :', selectedArticle.STOCK_PROD);
        console.log('Libellé :', selectedArticle.LIB_PROD);
        console.log('Condition :', selectedArticle.COND_PROD);
      }
  
      const selectedNumCom = this.livraisonForm.get('NUM_COM')?.value;
      const selectedCommande = this.commandes.find(commande => String(commande.NUM_COM) === String(selectedNumCom));
  
      if (selectedCommande) {
        const selectedLigne = selectedCommande.lignes.find((ligne: any) => ligne.CDE_PROD === selectedValue);
  
        if (selectedLigne) {
          this.lignes.at(index).patchValue({
            QTE_COM: selectedLigne.QTE_COM
          });
  
          console.log('Quantité de commande:', selectedLigne.QTE_COM);
        } else {
          console.log('Aucune ligne trouvée pour CDE_PROD sélectionné dans la commande.');
        }
      } else {
        console.log('Aucune commande trouvée pour NUM_COM sélectionné.');
      }
    }
  }
  
  isCdeProdAlreadySelected(cdeProd: string, currentIndex: number): boolean {
    return this.lignes.controls
      .filter((control, index) => index !== currentIndex)
      .some(control => control.get('CDE_PROD')?.value === cdeProd);
  }

  onSubmit(): void {
    if (this.livraisonForm.invalid) {
      this.livraisonForm.markAllAsTouched();
      return;
    }
  
    const livraisonData = this.livraisonForm.getRawValue();
    const avoirLotData = this.prepareAvoirLotData(livraisonData.lignes);
    const selectedNumCom = this.livraisonForm.get('NUM_COM')?.value;
  
    const quantitesToUpdate = livraisonData.lignes.map((ligne: any) => ({
      NUM_COM: selectedNumCom, 
      CDE_PROD: ligne.CDE_PROD, 
      QTE_LIV: ligne.QTE_LIV
    }));
  
    console.log('Quantités à mettre à jour:', quantitesToUpdate); 
  
    this.livraisonService.createLivraison(livraisonData).subscribe({
      next: (result) => {
        console.log('Delivery submitted successfully');
        this.updateStockForArticles(livraisonData.lignes); 
        this.submitAvoirLots(avoirLotData);
  
        this.livraisonService.updateQuantiteCommandes(quantitesToUpdate).subscribe({
          next: () => {
            console.log('Quantités de commandes mises à jour avec succès');
            this.ngOnInit();
            this.router.navigate([`/liste-des-livraisons`]);
          },
          error: (error) => {
            console.error('Erreur lors de la mise à jour des quantités de commandes', error);
          }
        });
      },
      error: (error) => {
        console.error('Erreur lors de l\'ajout de la livraison', error);
      }
    });
  }
  
  
  
  prepareAvoirLotData(lignes: any[]): any[] {
    return lignes.map(ligne => {
      const article = this.allArticles.find(a => a.CDE_PROD === ligne.CDE_PROD);
      if (article) {
        return {
          LIB_PROD: article.LIB_PROD,
          COND_PROD: article.COND_PROD,
          CDE_PROD: article.CDE_PROD,
          PRIX_ACHT_LOT: article.PRI_ACHT_PROD,  
          PRIX_VENT_LOT: article.PRI_VENT_PROD,  
          QTE_COM: ligne.QTE_COM,
          NUM_LOT: ligne.NUM_LOT,
          QTE_LOT: ligne.QTE_LIV * article.COND_PROD, 
          SUSPENDU: 'non',
          DATE_PER: ligne.DATE_PER
        };
      }
      return null;
    }).filter(data => data !== null);
  }
  
  submitAvoirLots(avoirLotData: any[]): void {
    this.livraisonService.createAvoirLots(avoirLotData).subscribe({
      next: (response) => {
        console.log('Avoir lots submitted successfully', response);
      },
      error: (error) => {
        console.error('Error submitting avoir lots', error);
      }
    });
  }
  

  onCdeProdSelect(ligne: AbstractControl): void {
    const selectedValue = ligne.get('CDE_PROD')?.value;
  
    if (selectedValue) {
      const cdeProdAlreadySelected = this.isCdeProdAlreadySelected(selectedValue, this.lignes.controls.indexOf(ligne));
  
      
        const selectedArticle = this.articles.find(article => article.CDE_PROD === selectedValue);
  
        if (selectedArticle) {
          ligne.get('CDE_PROD')?.patchValue(selectedArticle.CDE_PROD, { emitEvent: false });
          this.calculatePrixLiv(ligne as FormGroup);  
          ligne.get('error')?.setValue(null);
        }
      
    }
  }
  
onNumComChange(event: Event): void {
  const target = event.target as HTMLSelectElement;
  
  if (target && target.value !== undefined) {
    const selectedNumCom = target.value;
    
    if (selectedNumCom) {
      console.log('Numéro de commande sélectionné :', selectedNumCom);
      const selectedCommande = this.commandes.find(commande => String(commande.NUM_COM) === selectedNumCom);

      if (selectedCommande) {
        this.filter_CDE_FOUR = selectedCommande.CDE_FOUR;
        this.livraisonForm.patchValue({ 
          CDE_FOUR: this.filter_CDE_FOUR,
          NOM_FOUR: this.getNomFournisseur(this.filter_CDE_FOUR)
        });

        this.filteredCdeProdList = selectedCommande.lignes
          .filter((ligne: any) => ligne.QTE_COM >= 1)
          .map((ligne: any) => ligne.CDE_PROD);

        console.log('Filtered CDE_PROD List:', this.filteredCdeProdList);
      } else {
        this.filteredCdeProdList = [];
      }

      this.lignes.clear();
      this.addLigne(); 
    }
  } else {
    console.error('L\'élément de l\'événement ou la valeur est undefined.');
  }
}

  
  totalPrixTotal(): number {
    let totalPrix = 0;
    this.lignes.controls.forEach((ligne: AbstractControl) => {
      const prixTotal = parseFloat(ligne.get('PRIX_LIV')?.value);
      if (prixTotal) {
        totalPrix += prixTotal;
      }
    });
    return parseFloat(totalPrix.toFixed(3)); 
  }



  getAllFournisseurs(): void {
    this.livraisonService.getAllFournisseurs().subscribe({
      next: (data) => {
        this.fournisseurs = data; 
        console.log('fournisseur:', data)
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des fournisseurs :', error);
      }
    });
  }
  searchQueryName: string = '';
  searchQueryLibProd: string = ''; 
  searchResults: any[] = [];
  searchType: string = 'CDE_PROD'; 
  searchQuery: string = '';
  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
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
  resetSearch(): void {
    this.searchResults = [];
    this.searchQueryName = '';
  }

  
  articlesInStockOut: any[] = []; 
  articlesInStock: any[] = [];




}
