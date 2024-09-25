import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { LigneDeCommandeComponent } from './ligne-de-commande/ligne-de-commande.component';
import { FournisseursComponent } from './fournisseurs/fournisseurs.component';
import { produitComponent } from './produit/produit.component';
import { ListeDesFournisseursComponent } from './liste-des-fournisseurs/liste-des-fournisseurs.component';
import { ListeDesArticleComponent } from './liste-des-article/liste-des-article.component';
import { PrintPageComponent } from './print-page-commande/print-page.component';
import { UpdateFournisseurComponent } from './update-fournisseur/update-fournisseur.component';
import { UpdateArticleComponent } from './update-produit/update-produit.component';
import { LesFactureComponent } from './liste-des-commandes/lliste-des-commandes.component';
import { LivraisonComponent } from './livraison/livraison.component';
import { ListeDesLivraisonsComponent } from './liste-des-livraisons/liste-des-livraisons.component';
import { PrintLivraisonsComponent } from './print-page-livraisons/print-livraisons.component';
import { DemandeComponent } from './demande/demande.component';
import { ListeDesPatientsComponent } from './liste-des-patients/liste-des-patients.component';
import { PatientComponent } from './patient/patient.component';
import { ListeLignesDistrubitionsComponent } from './liste-lignes-distrubitions/liste-lignes-distrubitions.component';
import { PrintDemandePageComponent } from './print-demande-page/print-demande-page.component';
import { PatientUpdateComponent } from './patient-update/patient-update.component';
import { DashboredComponent } from './dashbored/dashbored.component';



const routes: Routes = [
  
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent},
  { path: 'ligne-de-commande', component: LigneDeCommandeComponent },
  { path: 'Ajouter-Fournisseur', component: FournisseursComponent },
  { path: 'Ajouter-produit', component: produitComponent },
  { path: 'ListeDesFournisseur', component: ListeDesFournisseursComponent },
  { path: 'ListeDesArticle', component: ListeDesArticleComponent },
  { path: 'print-commande-page', component: PrintPageComponent },
  { path: 'update-fournisseur/:id', component: UpdateFournisseurComponent },
  { path: 'update-Article/:id', component: UpdateArticleComponent },
  { path: 'liste-des-Commandes', component: LesFactureComponent },
  { path: 'livraison', component: LivraisonComponent },
  { path: 'liste-des-livraisons', component: ListeDesLivraisonsComponent },
  { path: 'print-livraison-page', component: PrintLivraisonsComponent },
  { path: 'ligne-de-demande', component: DemandeComponent },
  { path: 'patient', component: PatientComponent },
  { path: 'liste-des-patients', component: ListeDesPatientsComponent },
  { path: 'liste-des-lignes-de-distrubtion', component: ListeLignesDistrubitionsComponent },
  { path: 'update-patient/:id', component: PatientUpdateComponent }, 
  { path: 'print-demande-page', component: PrintDemandePageComponent },
  { path: 'Dashbored', component: DashboredComponent },
  { path: 'refresh', redirectTo: 'ligne-de-commande', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
