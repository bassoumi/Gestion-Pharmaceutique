import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/users.service';
import { ProduitService } from '../produit-service/produit.service';
import { Livraison } from '../livraison';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class produitComponent {
  formgroup: FormGroup;
  PRI_VENT_PROD: number = 0;
  articles: any[] = [];
  allArticles: any[] = []; 
  nomArticleExistant: boolean = false;


  constructor(private produitService: ProduitService, private router: Router, private fb: FormBuilder) {
    this.formgroup = this.fb.group({
      CDE_PROD: ['', Validators.required],
      COND_PROD: ['', Validators.required],
      LIB_PROD: ['', Validators.required],
      STOCK_PROD: [{value: 0, disabled: true}],
      PRI_ACHT_PROD: ['', Validators.required],
      PRI_VENT_PROD: [{value: '', disabled: true}],
      TYPE_PROD: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.generateRefArticle();
    this.getArticles();
    }

    onSubmit() {
      if (this.formgroup.valid) {
        const articleData = this.formgroup.value;
        articleData.PRI_VENT_PROD = this.PRI_VENT_PROD;
        console.log('Article data:', articleData);
  
        const duplicateArticle = this.articles.find(article => article.LIB_PROD === articleData.LIB_PROD);
  
        if (duplicateArticle) {
          this.nomArticleExistant = true;
          return; 
        }
  
        this.produitService.addArticle(articleData).subscribe({
          next: (data) => {
            console.log('Article ajouté avec succès :', data);
            this.router.navigate(['/ListeDesArticle']);
          },
          error: (error) => {
            console.error('Erreur lors de l\'ajout de l\'article :', error);
          }
        });
      } else {
        console.log('Le formulaire n\'est pas valide');
        this.formgroup.markAllAsTouched();
      }
    }
  
    getArticles(): void {
      this.produitService.getArticles().subscribe({
        next: (data) => {
          this.articles = data;
          console.log('Articles:', this.articles);
          this.generateRefArticle();
        },
        error: (error) => {
          console.error('Erreur lors de la récupération des articles :', error);
        }
      });
    }
  

  generateRefArticle(): void {
    if (this.articles.length > 0) {
      this.articles.sort((a, b) => (a.CDE_PROD > b.CDE_PROD ? 1 : -1));
      const lastArticle = this.articles[this.articles.length - 1];
      const lastCdeProd = lastArticle.CDE_PROD;

      const match = lastCdeProd.match(/AR(\d+)/);
      let newNum = 1;
      if (match) {
        newNum = parseInt(match[1], 10) + 1;
      }

      const newCdeProd = `AR${newNum.toString().padStart(3, '0')}`;
      this.formgroup.patchValue({ CDE_PROD: newCdeProd });
    } else {
      this.formgroup.patchValue({ CDE_PROD: 'AR001' });
    }
  }
  calculateVente(): void {
    const PRI_ACHT_PROD = this.formgroup.get('PRI_ACHT_PROD')?.value || 0;
    this.PRI_VENT_PROD = parseFloat((PRI_ACHT_PROD * 1.10).toFixed(3));
    this.formgroup.patchValue({ PRI_VENT_PROD: this.PRI_VENT_PROD });
  }

  setCondProd(value: string): void {
    this.formgroup.get('COND_PROD')!.setValue(value);
  }
  


  selectCondition(value: string): void {
    this.formgroup.get('TYPE_PROD')?.setValue(value);
  }
}