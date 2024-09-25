import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { LivraisionService } from '../service-livraison/livraision.service';
import { Router } from '@angular/router';
import { Livraison } from '../livraison';
import { LivraisonComponent } from '../livraison/livraison.component';
import { DemandeService } from '../demande-service/demande.service';
import { Demande } from '../demande';
import { forkJoin } from 'rxjs';
import { produit } from '../produit';
import { ProduitService } from '../produit-service/produit.service';


@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.css']
})
export class DemandeComponent implements OnInit{
  DemandeForm: FormGroup;
  articles: produit[] = [];
  searchQueryName: string = '';
  searchQueryLibProd: string = ''; 
  errorMessage: string = ''; 
  searchResults: any[] = [];
  articleQuantities: { [num_article: string]: number } = {};
  livraisons: Livraison[] = [];
    filteredCdeProdList: string[] = [];
    allArticles: any[] = [];
    patients: any[] = [];
    lots: any[] = [];
    patientNotFound: boolean = false;

    selectedPatient: string = '';

    dernierNumDemande: number = 0;


    constructor(private fb: FormBuilder, private livraisonService: LivraisionService, private DemandeService: DemandeService,private router: Router,private ProduitService:ProduitService) {
      const today = new Date().toISOString().substring(0, 10);
      this.DemandeForm = this.fb.group({
        ID_UNIQUE: ['' ,Validators.required],
        N_DEMANDE: ['', Validators.required],
        DAT_DEM: [this.getCurrentDate(), Validators.required],
        num_carte_desoin: ['', Validators.required],
        NOM_PATIENT: [{ value: '', disabled: true }],
        lignes: this.fb.array([])
      });
    }
    isSidebarOpen: boolean = false;

    toggleSidebar(): void {
      this.isSidebarOpen = !this.isSidebarOpen;
    }
    resetSearch(): void {
      this.searchResults = [];
      this.searchQueryName = '';
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
    
    
  
    loadPatients(): void {
      this.DemandeService.getPatients().subscribe({
        next: (data) => {
          this.patients = data;
          console.log('Patients récupérés:', this.patients); 
        },
        error: (error) => {
          console.error('Erreur lors de la récupération des patients :', error);
        }
      });
    }
  

    ngOnInit(): void {
      if (!localStorage.getItem('reloaded')) {
          localStorage.setItem('reloaded', 'true'); 
          location.reload(); 
      } else {
          localStorage.removeItem('reloaded');
  
          this.getArticles();
          this.loadPatients();
          this.loadLastDemande();
          this.loadLots();
  
          this.DemandeForm.get('num_carte_desoin')?.valueChanges.subscribe(id => {
              this.updatePatientName(id);
          });
      }
  }
  
    

    updatePatientName(numCarteDesoin: string): void {
      console.log('Recherche pour num_carte_desoin:', numCarteDesoin);  
      
      const patient = this.patients.find(p => p.num_carte_desoin === numCarteDesoin);
      console.log('Patient trouvé:', patient);  
      
      if (patient) {
        this.DemandeForm.patchValue({
          ID_UNIQUE: patient.ID_UNIQUE,
          NOM_PATIENT: `${patient.NOM} ${patient.PRENOM}`
        });
        this.patientNotFound = false;
      } else {
        this.DemandeForm.patchValue({
          ID_UNIQUE: '',
          NOM_PATIENT: ''
        });
        this.patientNotFound = true;
      }
    }
    
    
    
    getCurrentDate(): string {
      const today = new Date();
      const day = String(today.getDate()).padStart(2, '0');
      const month = String(today.getMonth() + 1).padStart(2, '0'); 
      const year = today.getFullYear();
      return `${year}-${month}-${day}`;
    }
  
    
    loadLots(): void {
      this.DemandeService.getAllLots().subscribe(
        (data) => {
          console.log('tous les lot ',data)
          this.lots = data;
        },
        (error) => {
          console.error('Erreur lors du chargement des lots', error);
          if (error.status === 404) {
            console.log("Ressource non trouvée.");
          } else if (error.status === 500) {
            console.log("Erreur du serveur.");
          } else {
            console.log("Autre erreur :", error.message);
          }
        }
      );
    }

    
    get lignes(): FormArray {
      return this.DemandeForm.get('lignes') as FormArray;
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
    
 
    loadLastDemande(): void {
      this.DemandeService.getLastDemande().subscribe({
        next: (data) => {
          this.dernierNumDemande = data.lastNDEMANDE + 1;
          this.DemandeForm.patchValue({ N_DEMANDE: this.dernierNumDemande });
          console.log(this.dernierNumDemande)
        },
        error: (error) => {
          console.error('Erreur lors de la récupération du dernier N_DEMANDE :', error);
        }
      });
    }

    totalPrixTotal(): number {
      let totalPrix = 0;
      this.lignes.controls.forEach((ligne: AbstractControl) => {
        const prixTotal = parseFloat(ligne.get('totale')?.value);
        if (!isNaN(prixTotal)) {
          totalPrix += prixTotal;
        }
      });
      return parseFloat(totalPrix.toFixed(3)); 
    }
    
    addLigne(): void {
      const numDemande = this.DemandeForm.get('N_DEMANDE')?.value;
      const ligneFormGroup = this.fb.group({
        cde_prod: ['', Validators.required],
        num_dem: [numDemande],
        LIB_PROD: ['', Validators.required],
        PRI_VENT_PROD: ['', Validators.required],
        qte_dem: ['', Validators.required],
        qte_dist: ['', Validators.required],
        totale: [{ value: '', disabled: true }, Validators.required], 
        error: ['']
      });
  
      ligneFormGroup.get('CDE_PROD')?.valueChanges.subscribe(() => {
      });
  
  
      this.lignes.push(ligneFormGroup);
    }

  
    removeLigne(index: number): void {
      this.lignes.removeAt(index);
    }
  
    

  

    articlesInStockOut: any[] = []; 
    articlesInStock: any[] = [];
    
  
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


  findDuplicateCodes(): string[] {
    const codes = this.lignes.controls.map((ligne: AbstractControl) => ligne.get('cde_prod')?.value.trim().toUpperCase());
    const uniqueCodes = new Set<string>();
    const duplicates: string[] = [];

    codes.forEach(code => {
      if (uniqueCodes.has(code)) {
        duplicates.push(code);
      } else {
        uniqueCodes.add(code);
      }
    });

    return duplicates;
  }


  async onSubmit(): Promise<void> {
    if (this.DemandeForm.invalid) {
      this.errorMessage = 'Le formulaire est invalide.';
      return;
    }
  
    const demandeData: any = { ...this.DemandeForm.value };
  
    delete demandeData.num_carte_desoin;
  
    if (!demandeData.lignes || demandeData.lignes.length === 0) {
      this.errorMessage = 'Il faut au moins une ligne de demande pour soumettre.';
      return;
    }
  
    const duplicateCodes = this.findDuplicateCodes();
    if (duplicateCodes.length > 0) {
      this.errorMessage = `Les codes produits suivants sont déjà utilisés: ${duplicateCodes.join(', ')}`;
      return;
    }
  
    if (!demandeData.N_DEMANDE) {
      this.errorMessage = 'N_DEMANDE manquant dans demandeData';
      return;
    }
  
    try {
      const response = await this.DemandeService.createDemande(demandeData).toPromise();
      console.log('Réponse du backend pour la demande:', response);
  
      if (!response || !response.N_DEMANDE) {
        this.errorMessage = 'Erreur lors de la création de la demande.';
        return;
      }
  
      const lignes = demandeData.lignes;
      const addLigneTasks: Promise<any>[] = [];
      const usedLots: any[] = [];
  
      for (const ligne of lignes) {
        const ligneData = {
          demande: response.N_DEMANDE,  
          cde_prod: ligne.cde_prod,
          num_dem: ligne.num_dem,
          qte_dem: ligne.qte_dem,
          qte_dist: ligne.qte_dist
        };
  
        addLigneTasks.push(
          this.DemandeService.addLigneDemande(ligneData).toPromise()
            .catch(error => {
              console.error('Erreur lors de l\'ajout de la ligne de demande:', error);
              this.errorMessage = 'Erreur lors de l\'ajout de la ligne de demande';
            })
        );
      }
  
      await Promise.all(addLigneTasks);
  
      for (const ligne of lignes) {
        const article = this.articles.find(a => a.CDE_PROD === ligne.cde_prod);
        if (article) {
          const lots = await this.DemandeService.getAllLots().toPromise();
          const filteredLots = lots.filter((lot: any) => lot.CDE_PROD === ligne.cde_prod);
  
          if (filteredLots.length === 0) {
            this.errorMessage = 'Aucun lot trouvé pour ce produit';
            return;
          }
  
          const sortedLots = filteredLots.sort((a: any, b: any) =>
            new Date(a.DATE_PER).getTime() - new Date(b.DATE_PER).getTime()
          );
  
          let remainingQuantity = ligne.qte_dist;
          let totalAvailableQuantity = sortedLots.reduce((total: number, lot: any) => total + lot.QTE_LOT, 0);
  
          if (totalAvailableQuantity < remainingQuantity) {
            this.errorMessage = 'Stock insuffisant pour cette demande';
            return;
          }
  
          for (const lot of sortedLots) {
            if (remainingQuantity <= 0) break;
  
            const lotQuantity = lot.QTE_LOT;
            const lotUpdateData = {
              num_lot: lot.NUM_LOT,
              qte_lot: lotQuantity >= remainingQuantity ? lotQuantity - remainingQuantity : 0,
              cde_prod: lot.CDE_PROD
            };
  
            await this.DemandeService.updateLot(lotUpdateData).toPromise()
              .catch(() => {
                this.errorMessage = 'Erreur lors de la mise à jour du lot';
              });
  
            usedLots.push({
              ndemande: response.N_DEMANDE,
              nlot: lot.NUM_LOT,
              cde_prod: lot.CDE_PROD,
              date_peremption: lot.DATE_PER,
              qte_lot: Math.min(lotQuantity, remainingQuantity),
              prix_dist: Math.min(lotQuantity, remainingQuantity) * lot.PRIX_VENT_LOT
            });
  
            remainingQuantity -= lotQuantity;
          }
        }
      }
  
      const validUsedLots = usedLots.filter(lot => lot.qte_lot > 0);
      if (validUsedLots.length > 0) {
        await this.DemandeService.saveUsedLots(validUsedLots).toPromise()
          .catch(() => {
            this.errorMessage = 'Erreur : échec de l\'enregistrement des lots utilisés';
          });
      }
  
      if (!this.errorMessage) {
        this.router.navigate(['/liste-des-lignes-de-distrubtion']);
      }
    } catch (error) {
      console.error('Erreur lors de la soumission de la demande:', error);
      this.errorMessage = 'Erreur lors de la soumission de la demande';
    }
  }
  
  
  
  
  onCodeChange(index: number, event: Event): void {
    const code = (event.target as HTMLInputElement).value.trim().toUpperCase();
    console.log('Code produit entré:', code);
  
    const article = this.allArticles.find(a => a.CDE_PROD.trim().toUpperCase() === code);
    const isDuplicate = this.lignes.controls.some((ligne, i) => 
    i !== index && ligne.get('cde_prod')?.value.trim().toUpperCase() === code
  );
  
    if (article) {
      this.lignes.at(index).patchValue({
        LIB_PROD: article.LIB_PROD,
        PRI_VENT_PROD: article.PRI_VENT_PROD,
        error: null
      });
  
      this.lignes.at(index).get('qte_dist')?.valueChanges.subscribe((qte_dist) => {
        const prix_vente = article.PRI_VENT_PROD;
        const total = prix_vente * qte_dist;
        this.lignes.at(index).patchValue({ totale: total });
      });
  
    } else {
      this.lignes.at(index).patchValue({
        LIB_PROD: '',
        PRI_VENT_PROD: '',
        totale: '',
        error: `Aucun article trouvé pour le code "${code}".`
      });
    }
    if (isDuplicate) {
      this.lignes.at(index).get('error')?.setValue('Code produit déjà utilisé dans une autre ligne.');
    }
  }

  
  onArticleSelect(index: number, event: Event): void {
    const selectedCdeProd = (event.target as HTMLSelectElement).value;
    const selectedArticle = this.allArticles.find(article => article.CDE_PROD === selectedCdeProd);
  
    if (selectedArticle) {
      const libelleControl = this.lignes.at(index).get('LIB_PROD');
      if (libelleControl) {
        libelleControl.setValue(selectedArticle.LIB_PROD);
      }
      this.lignes.at(index).get('error')?.setValue(null);
    } else {
      this.lignes.at(index).get('error')?.setValue(`Aucun article trouvé pour le code "${selectedCdeProd}".`);
    }
  }


  



  onLibelleChange(index: number, event: Event): void {
    const libelle = (event.target as HTMLInputElement).value.trim().toUpperCase();
    console.log('Libellé entré:', libelle);
  
    const article = this.allArticles.find(a => a.LIB_PROD.trim().toUpperCase() === libelle);
  
    if (article) {
      const cdeProdControl = this.lignes.at(index).get('cde_prod');
      const cPRI_VENT_PRODControl = this.lignes.at(index).get('PRI_VENT_PROD');
      if (cdeProdControl) {
        cdeProdControl.setValue(article.CDE_PROD);
        cPRI_VENT_PRODControl!.setValue(article.PRI_VENT_PROD);
      }
      this.lignes.at(index).get('error')?.setValue(null);
    } else {
      this.lignes.at(index).patchValue({
        cde_prod: '',
        error: `Aucun article trouvé pour le libellé "${libelle}".`
      });
    }
  }
  

    
    isCdeProdAlreadySelected(cdeProd: string, currentIndex: number): boolean {
      return this.lignes.controls
        .filter((control, index) => index !== currentIndex)
        .some(control => control.get('CDE_PROD')?.value === cdeProd);
    }
  

    
    

    validateQuantities(index: number): void {
      const formGroup = this.lignes.at(index);
      const qteDem = formGroup.get('qte_dem')?.value;
      const qteDist = formGroup.get('qte_dist')?.value;
    
      if (qteDist > qteDem) {
        formGroup.get('qte_dist')?.setErrors({ 'qteDistInvalid': true });
      } else {
        formGroup.get('qte_dist')?.setErrors(null);
      }
    }
    
    truncateText(text: string, maxLength: number = 10): string {
      if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
      }
      return text;
    }
  
  
}
