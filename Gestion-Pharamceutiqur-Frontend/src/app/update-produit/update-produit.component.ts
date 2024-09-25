import { ChangeDetectorRef, Component } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProduitService } from '../produit-service/produit.service';

@Component({
  selector: 'app-update-produit',
  templateUrl: './update-produit.component.html',
  styleUrls: ['./update-produit.component.css']
})
export class UpdateArticleComponent {
  formgroup: FormGroup;
  PRI_VENT_PROD: number = 0;


  Article: any = {
    id: null,
CDE_PROD: '',
COND_PROD: '',
LIB_PROD: '',
PRI_ACHT_PROD: '',
PRI_VENT_PROD: '',
STOCK_PROD: '',
  };
  fournisseurs: any[] = [];

  constructor(private ProduitService: ProduitService, private route: ActivatedRoute, private router: Router,    private cdRef: ChangeDetectorRef  // Injecter ChangeDetectorRef
  ) {
    this.formgroup = new FormGroup({
      CDE_PROD: new FormControl('', [Validators.required]),
      COND_PROD: new FormControl('', [Validators.required]),
      LIB_PROD: new FormControl('', [Validators.required]),
      PRI_ACHT_PROD: new FormControl('', [Validators.required]),
      PRI_VENT_PROD: new FormControl('', [Validators.required]),
      TYPE_PROD: new FormControl('', [Validators.required]),
      STOCK_PROD: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.ProduitService.getArticleById(id).subscribe(data => {
      this.Article = data;
      this.formgroup.patchValue(this.Article);
    });
   
  }

  calculateVente(): void {
    const PRI_ACHT_PROD = this.formgroup.get('PRI_ACHT_PROD')?.value || 0;
    this.PRI_VENT_PROD = PRI_ACHT_PROD * 1.10;  
    this.formgroup.patchValue({ PRI_VENT_PROD: this.PRI_VENT_PROD });
  }

  onSubmit() {
    const formData = {
      ...this.Article,
      ...this.formgroup.value
    };
    console.log('FormData to be sent:', formData); 
  
    this.ProduitService.updateArticle(this.Article.CDE_PROD, formData).subscribe(
      data => {
        console.log('Article mis à jour avec succès :', data);
        this.router.navigate(['/ListeDesArticle']);
      },
      error => {
        console.error('Erreur lors de la mise à jour de l\'article :', error);
      }
    );
  }
  
  setCondProd(value: string): void {
    this.formgroup.get('TYPE_PROD')!.setValue(value);
  }

  
  selectCondition(value: string): void {
    this.formgroup.get('TYPE_PROD')?.setValue(value);
  }

  Annuler(){
    this.router.navigate(['/ListeDesArticle']);
  }
  
}
