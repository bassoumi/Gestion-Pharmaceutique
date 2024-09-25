import { Component } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent {
  demandes: any[] = [];
  username: string | null = '';
  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    console.log('Retrieved username:', this.username);  
    if (this.username) {
      this.usersService.getAllDemandes(this.username).subscribe(response => {
        this.demandes = JSON.parse(response.demandes);
        console.log('Demandes:', this.demandes); 
        console.log(this.username); 
        
      });
    }
  }
  
  deleteDemande(id: number): void {
    console.log('Demande ID à supprimer:', id);  
    if (confirm('Voulez-vous vraiment supprimer cette demande ?')) {
      this.usersService.deleteDemande(id).subscribe(() => {
        this.demandes = this.demandes.filter(demande => demande.id !== id);
        this.ngOnInit()
      });
    }
  }
  deleteAllDemandes(): void {
    if (confirm('Voulez-vous vraiment supprimer toutes les demandes ?')) {
      this.usersService.deleteAllDemandes().subscribe(() => {
        this.demandes = []; 
      });
    }
  }
}
