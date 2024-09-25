import { Component } from '@angular/core';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-print-page',
  templateUrl: './print-page.component.html',
  styleUrls: ['./print-page.component.css']
})
export class PrintPageComponent {
  commandeData: any;
  totalPrix: number = 0;
  numCommande: string;
  constructor(private commandeService: UsersService,private router: Router) {this.numCommande = ''; }
  ngOnInit(): void {
    const storedCommandeData = localStorage.getItem('commandeData');
    if (storedCommandeData) {
      console.log(storedCommandeData)
      this.commandeData = JSON.parse(storedCommandeData);

      this.totalPrix = this.commandeData.totalPrix; 
      this.numCommande = this.commandeData.num_commande; 
      console.log(this.totalPrix)
    }
  }

  printPage(): void {
    window.print();

  }
}
