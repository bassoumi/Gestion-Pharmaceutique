import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientsService } from '../patient-services/patients.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  formgroup: FormGroup;
  patients: any[] = [];  

  constructor(private formBuilder: FormBuilder, private patientService: PatientsService,private router: Router) {
    this.formgroup = this.formBuilder.group({
      ID_UNIQUE: [''],
      NOM: ['', Validators.required],
      PRENOM: ['', Validators.required],
      DATE_NAISSANCE: ['',Validators.required],
      ADRESSE: ['',Validators.required],
      TELEPHONE: ['',Validators.required],
      EMAIL: ['',Validators.required],
      SEXE: ['',Validators.required],
      num_carte_desoin: ['',Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients(): void {
    this.patientService.getPatients().subscribe({
      next: (data) => {
        this.patients = data;
        console.log('Patients récupérés:', this.patients);
        this.generateRefPatient();

      },
      error: (error) => {
        console.error('Erreur lors de la récupération des patients :', error);
      }
    });
  }



  

  generateRefPatient(): void {
    if (this.patients.length > 0) {
      this.patients.sort((a, b) => (a.ID_UNIQUE > b.ID_UNIQUE ? 1 : -1));
      const lastPatient = this.patients[this.patients.length - 1];
      const lastIdUnique = lastPatient.ID_UNIQUE;
  
      const lastIdUniqueStr = lastIdUnique.toString();
  
      console.log('Dernier ID_UNIQUE:', lastIdUniqueStr);
  
      const match = lastIdUniqueStr.match(/(\d+)/);
      let newNum = 1;
      if (match) {
        newNum = parseInt(match[1], 10) + 1;
      }
  
      const newIdUnique = `PT${newNum.toString().padStart(3, '0')}`;
      console.log('Nouveau ID_UNIQUE:', newIdUnique);
      this.formgroup.patchValue({ ID_UNIQUE: newIdUnique });
    } else {
      this.formgroup.patchValue({ ID_UNIQUE: 'PT001' });
    }
  }
 

  errorMessage: string | null = null;
  onSubmit(): void {
    if (this.formgroup.valid) {
      const numCarteDesoin = this.formgroup.value.ID_UNIQUE;

      const isDuplicate = this.patients.some(patient => patient.ID_UNIQUE === numCarteDesoin);

      if (isDuplicate) {
        this.errorMessage = 'Erreur : ID_UNIQUE déjà utilisé.';
        return;
      }

      this.patientService.addPatient(this.formgroup.value).subscribe({
        next: (response) => {
          console.log('Patient ajouté avec succès!', response);
          this.formgroup.reset();
          this.errorMessage = null;
          this.router.navigate([`/liste-des-patients`]);

        },
        error: (error) => {  
            console.log('Patient ajouté avec succès!', this.formgroup);
          console.error('Erreur lors de l\'ajout du patient :', error);
        }
      });
    }
  }
}
