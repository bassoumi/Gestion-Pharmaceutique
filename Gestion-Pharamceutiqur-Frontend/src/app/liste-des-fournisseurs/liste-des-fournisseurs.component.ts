import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';
import { FournisseurService } from '../fournisseur-service/fournisseur.service';

@Component({
  selector: 'app-liste-des-fournisseurs',
  templateUrl: './liste-des-fournisseurs.component.html',
  styleUrls: ['./liste-des-fournisseurs.component.css']
})
export class ListeDesFournisseursComponent {
  fournisseurs: any[] = [];
  searchQueryName: string = '';
  searchResults:any [] = [];


  constructor(private fb: FormBuilder, private userService: FournisseurService,private router: Router) {}

  ngOnInit(): void {
    this.getAllFournisseurs();

  }

  modify(id: string): void {
    this.router.navigate(['/update-fournisseur', id]);
  }

  getAllFournisseurs(): void {
    this.userService.getAllFournisseurs().subscribe({
      next: (data) => {
        this.fournisseurs = data.sort((a, b) => {
          const codeA = a.CDE_FOUR ? parseInt(a.CDE_FOUR.replace(/FR/, ''), 10) : 0;
          const codeB = b.CDE_FOUR ? parseInt(b.CDE_FOUR.replace(/FR/, ''), 10) : 0;
          return codeB - codeA; 
        });
        console.log('Fournisseurs triés :', this.fournisseurs);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des fournisseurs :', error);
      }
    });
  }
  
  
  deleteFournisseur(id: string): void {
    this.userService.deleteFournisseur(id).subscribe({
      next: () => {
        console.log('Fournisseur supprimé avec succès');
        this.getAllFournisseurs();  
      },
      error: (error) => {
        console.error('Erreur lors de la suppression du fournisseur :', error);
      }
    });
  }
  
  onSearch(event: Event): void {
    event.preventDefault(); 
    this.searchQueryName = this.searchQueryName.trim();
    if (this.searchQueryName === '') {
      return;
    }
    this.userService.searchFournisseur(this.searchQueryName).subscribe(
      (data: any[]) => {
        console.log('Search results:', data);
        this.searchResults = data; 
      },
      (error) => {
        console.error('Search error', error);
      }
    );
  }
  resetSearch(): void {
    this.searchResults = []; 
    this.searchQueryName = ''; 
  }

  getGoogleMapsUrl(address: string): string {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  }
}
