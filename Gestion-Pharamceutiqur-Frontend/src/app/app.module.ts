import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthInterceptor } from './interceptors/auth.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatToolbarModule } from '@angular/material/toolbar';
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
import { PatientComponent } from './patient/patient.component';
import { ListeDesPatientsComponent } from './liste-des-patients/liste-des-patients.component';
import { ListeLignesDistrubitionsComponent } from './liste-lignes-distrubitions/liste-lignes-distrubitions.component';
import { PrintDemandePageComponent } from './print-demande-page/print-demande-page.component';
import { PatientUpdateComponent } from './patient-update/patient-update.component';
import { DashboredComponent } from './dashbored/dashbored.component';






@NgModule({
  declarations: [
    AppComponent,

    NavbarComponent,
    LoginComponent,
    HomeComponent,

    LigneDeCommandeComponent,
    FournisseursComponent,
    produitComponent,
    ListeDesFournisseursComponent,
    ListeDesArticleComponent,
    PrintPageComponent,
    UpdateFournisseurComponent,
    UpdateArticleComponent,
    LesFactureComponent,
    LivraisonComponent,
    ListeDesLivraisonsComponent,
    PrintLivraisonsComponent,
    DemandeComponent,
    PatientComponent,
    ListeDesPatientsComponent,
    ListeLignesDistrubitionsComponent,
    PrintDemandePageComponent,
    PatientUpdateComponent,
    DashboredComponent,
  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    NgxChartsModule,
  ],
  providers: [  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
