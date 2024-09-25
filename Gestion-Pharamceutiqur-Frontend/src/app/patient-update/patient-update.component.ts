import { Component } from '@angular/core';
import { PatientsService } from '../patient-services/patients.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-patient-update',
  templateUrl: './patient-update.component.html',
  styleUrls: ['./patient-update.component.css']
})
export class PatientUpdateComponent {
  updateSuccess: boolean = false;
  updateError: boolean = false;
  patient: any = {};
constructor(   private route: ActivatedRoute,
  private patientService: PatientsService,
  private router: Router){}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); 
    if (id) {
      this.patientService.getPatient(Number(id)).subscribe({
        next: (data) => {
          this.patient = data;
        },
        error: (error) => {
          console.error('Erreur lors de la récupération du patient :', error);
        }
      });
    }
  }

  updatePatient(): void {
    this.patientService.updatePatient(this.patient.ID_UNIQUE, this.patient).subscribe({
      next: (updatedPatient) => {
        console.log('Patient mis à jour:', updatedPatient);
        this.updateSuccess = true;
        this.updateError = false;
  
        setTimeout(() => {
          this.router.navigate(['/liste-des-patients']);
        }, 500); 
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour du patient :', error);
        this.updateSuccess = false;
        this.updateError = true;
      }
    });
  }
  

}
