import { Component, OnInit } from '@angular/core';
import { PatientsService } from '../patient-services/patients.service';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';




@Component({
  selector: 'app-liste-des-patients',
  templateUrl: './liste-des-patients.component.html',
  styleUrls: ['./liste-des-patients.component.css']
})
export class ListeDesPatientsComponent implements OnInit {
  searchId: string = '';
  searchResults: any[] = [];
  errorMessage: string = ''; 
  searchType: string = 'ID_UNIQUE'; 
  searchValue: string = '';
  patients: any[] = [];

constructor(private PatientsService: PatientsService, private router:Router){}




ngOnInit(): void {
  this.loadPatients();

}

loadPatients(): void {
  this.PatientsService.getPatients().subscribe({
    next: (data) => {
      this.patients = data.sort((a, b) => b.ID_UNIQUE - a.ID_UNIQUE);
      console.log('Patients récupérés et triés:', this.patients); 
    },
    error: (error) => {
      this.errorMessage = 'Erreur lors du chargement des patients : ' + error.message;

      console.error('Erreur lors de la récupération des patients :', error);
    }
  });
}
deletePatient(id: number): void {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce patient ?')) {
    this.PatientsService.deletePatient(id).subscribe({
      next: () => {
        console.log('Patient supprimé');
        this.loadPatients(); 
      },
      error: (error) => {
        console.error('Erreur lors de la suppression du patient :', error);
      }
    });
  }

 
}
// ListeDesPatientsComponent.ts
updatePatient(id: number): void {
  this.router.navigate(['/update-patient', id]);
}

onSearch(event: Event): void {
  event.preventDefault();

  let params = new HttpParams();

  if (this.searchType === 'ID_UNIQUE') {
    params = params.set('ID_UNIQUE', this.searchValue);
  } else if (this.searchType === 'num_carte_desoin') {
    params = params.set('num_carte_desoin', this.searchValue);
  }

  this.PatientsService.searchPatients(params).subscribe({
    next: (data) => {
      if (data.length === 0) {
        this.errorMessage = 'Aucun patient trouvé... ';
        this.searchResults = [];
      } else {
        this.errorMessage = '';
        this.searchResults = data;
      }
      console.log('Résultats de la recherche:', this.searchResults);
    },
    error: (error) => {
      console.error('Erreur lors de la recherche des patients :', error);
    }
  });
}


resetSearch(): void {
  this.searchValue = '';
  this.searchResults = [];
  this.errorMessage = '';  
  this.loadPatients(); 
}
  
}
