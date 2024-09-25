import { Component } from '@angular/core';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-print-livraisons',
  templateUrl: './print-livraisons.component.html',
  styleUrls: ['./print-livraisons.component.css']
})
export class PrintLivraisonsComponent {
  livraisonData: any;
  totalPrix: number = 0;
  numCommande: string;
  constructor(private commandeService: UsersService,private router: Router) {this.numCommande = ''; }
  ngOnInit(): void {
    const storedlivraisonData = localStorage.getItem('livraisonData');
    if (storedlivraisonData) {
      console.log(storedlivraisonData)
      this.livraisonData = JSON.parse(storedlivraisonData);

      this.totalPrix = this.livraisonData.totalPrix; 
      this.numCommande = this.livraisonData.num_commande; 
      console.log(this.totalPrix)
    }
  }

  printPage(): void {
    window.print();

  }
}
