import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../users.service';
import { FournisseurService } from '../fournisseur-service/fournisseur.service';

@Component({
  selector: 'app-update-fournisseur',
  templateUrl: './update-fournisseur.component.html',
  styleUrls: ['./update-fournisseur.component.css']
})
export class UpdateFournisseurComponent implements OnInit {
  data: any;
  selectedFile: File | null = null;
  form: FormGroup;
  Fournisseur: any = {
    id: null,
    CDE_FOUR: '',
    NOM_FOUR: '',
    ADR_FOUR: '',
    TEL_BUR : '',
    TEL_PORT: '',
    FAX_FOUR : '',
    MAIL_FOUR: '',
  };

  constructor(private FournisseurService: FournisseurService, private route: ActivatedRoute, private router: Router) {
    this.form = new FormGroup({
      CDE_FOUR: new FormControl('', [Validators.required]),
      NOM_FOUR: new FormControl('', [Validators.required]),
      ADR_FOUR: new FormControl('', [Validators.required]),
      TEL_BUR: new FormControl('', [Validators.required]),
      TEL_PORT: new FormControl('', [Validators.required]),
      FAX_FOUR: new FormControl('', [Validators.required]),
      MAIL_FOUR: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.FournisseurService.getFournisseurById(id).subscribe(data => {
      this.Fournisseur = data;
      this.form.patchValue(this.Fournisseur);
    });
  }

  submit() {
    const formData = this.form.value;
  
    this.FournisseurService.updateFournisseur(this.Fournisseur.CDE_FOUR, formData).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['/ListeDesFournisseur']); 
      },
      error => {
        console.error('Error updating fournisseur', error);
      }
    );
  }

  Annuler(){
    this.router.navigate(['/ListeDesFournisseur']);
  }
}
