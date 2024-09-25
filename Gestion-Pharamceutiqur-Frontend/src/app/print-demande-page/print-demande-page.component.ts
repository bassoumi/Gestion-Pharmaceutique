import { Component } from '@angular/core';

@Component({
  selector: 'app-print-demande-page',
  templateUrl: './print-demande-page.component.html',
  styleUrls: ['./print-demande-page.component.css']
})
export class PrintDemandePageComponent {
  demandeData: any;
  ngOnInit(): void {
    const storedDemandeData = localStorage.getItem('demandeData');
    if (storedDemandeData) {
      this.demandeData = JSON.parse(storedDemandeData);
      console.log('Parsed Demande Data:', this.demandeData);
    }
  }

  getFormattedPrixTotal(): string {
    const prixTotal = this.demandeData?.prixTotal; 
    console.log('Prix Total:', prixTotal); 
    if (typeof prixTotal === 'number' && !isNaN(prixTotal)) {
      return prixTotal.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    return 'N/A'; 
  }

  printPage(): void {
    window.print(); 
  }
}
