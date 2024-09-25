import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FournisseurService } from '../fournisseur-service/fournisseur.service';

@Component({
  selector: 'app-fournisseurs',
  templateUrl: './fournisseurs.component.html',
  styleUrls: ['./fournisseurs.component.css']
})
export class FournisseursComponent implements OnInit {
  formgroup: FormGroup;
  fournisseurs: any[] = [];
  nomFournisseurExistant: boolean = false;


  constructor(private fournisseurService: FournisseurService, private router: Router) {
    this.formgroup = new FormGroup({
      CDE_FOUR: new FormControl('', Validators.required),
      NOM_FOUR: new FormControl('', Validators.required),
      ADR_FOUR: new FormControl('', Validators.required),
      TEL_BUR: new FormControl('', Validators.required),
      TEL_PORT: new FormControl('', Validators.required),
      FAX_FOUR: new FormControl('', Validators.required),
      MAIL_FOUR: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.getFournisseurs();
  }

  ajouterFournisseur() {
    if (this.formgroup.valid) {
      const fournisseurData = this.formgroup.value;

      const duplicateFournisseur = this.fournisseurs.find(four => four.NOM_FOUR === fournisseurData.NOM_FOUR);

      if (duplicateFournisseur) {

        this.nomFournisseurExistant = true;
        return; 
      }

      this.fournisseurService.ajouterFournisseur(fournisseurData).subscribe({
        next: (data) => {
          console.log('Fournisseur ajouté avec succès :', data);
          this.router.navigate(['/ListeDesFournisseur']);
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout du fournisseur :', error);
        }
      });
    } else {
      console.log('Le formulaire n\'est pas valide');
      this.formgroup.markAllAsTouched();
    }
  }


  getFournisseurs(): void {
    this.fournisseurService.getAllFournisseurs().subscribe({
      next: (data) => {
        this.fournisseurs = data;
        console.log('Fournisseurs:', this.fournisseurs);
        this.generateRefFournisseur();

        this.nomFournisseurExistant = false;

        const duplicateFournisseur = this.fournisseurs.find(four => four.NOM_FOUR === this.formgroup.get('NOM_FOUR')?.value);
console.log(duplicateFournisseur)
        if (duplicateFournisseur) {
          this.nomFournisseurExistant = true;
        }
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des fournisseurs :', error);
      }
    });
  }

  generateRefFournisseur(): void {
    if (this.fournisseurs.length > 0) {
      this.fournisseurs.sort((a, b) => (a.CDE_FOUR > b.CDE_FOUR ? 1 : -1));
      const lastFournisseur = this.fournisseurs[this.fournisseurs.length - 1];
      const lastCdeFour = lastFournisseur.CDE_FOUR;

      const match = lastCdeFour.match(/FR(\d+)/);
      let newNum = 1;
      if (match) {
        newNum = parseInt(match[1], 10) + 1;
      }

      const newCdeFour = `FR${newNum.toString().padStart(3, '0')}`;
      this.formgroup.patchValue({ CDE_FOUR: newCdeFour });
    } else {
      this.formgroup.patchValue({ CDE_FOUR: 'FR001' });
    }
  }
}
