import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthentificationComponent } from './authentification/authentification.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { CategoryComponent } from './category/category.component';
import { ContactComponent } from './contact/contact.component';
import { ErrorComponent } from './error/error.component';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { JobListComponent } from './job-list/job-list.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { AjouterOffreComponent } from './ajouter-offre/ajouter-offre.component';
import { ListerOffreComponent } from './lister-offre/lister-offre.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { ModifierOffreComponent } from './modifier-offre/modifier-offre.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ListerCandidatureComponent } from './lister-candidature/lister-candidature.component';
import { MesCandidaturesEtudiantComponent } from './mes-candidatures-etudiant/mes-candidatures-etudiant.component';
import { MesCandidaturesEntrepreneurComponent } from './mes-candidatures-entrepreneur/mes-candidatures-entrepreneur.component';
import { CandidaturesComponent } from './admin/candidatures/candidatures.component';
import { OffresComponent } from './admin/offres/offres.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { EtudiantsComponent } from './admin/etudiants/etudiants.component';
import { EntrepreneursComponent } from './admin/entrepreneurs/entrepreneurs.component';
const routes: Routes = [
  { path: 'authentification', component: AuthentificationComponent }, 
  { path: 'home', component: HomeComponent }, // Ajoute cette ligne pour que 'home' fonctionne
  {path: 'about',component:AboutComponent},
  {path : 'category',component:CategoryComponent},
  {path :'contact',component:ContactComponent},
  {path :'error',component:ErrorComponent},
  { path: 'job-detail/:id', component: JobDetailComponent },
  {path:'job-list',component:JobListComponent},
  {path:'testimonial',component:TestimonialComponent},
  {path :'ajouter-offre',component:AjouterOffreComponent},
  {path:'lister-offre',component:ListerOffreComponent},
  {path:'welcome',component:WelcomePageComponent},
  {path:'lister-candidatures',component:ListerCandidatureComponent},
  {path:'lister-candidaturesEtu',component:MesCandidaturesEtudiantComponent},
  {path:'lister-candidaturesEntr',component:MesCandidaturesEntrepreneurComponent},
  { path: 'modifier/:id', component: ModifierOffreComponent },  
  { path: '', component: WelcomePageComponent }, // Route par défaut
  {path:'profile',component:UserProfileComponent},

  { path: 'offres', component: OffresComponent },
  { path: 'candidatures', component: CandidaturesComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'etudiants', component: EtudiantsComponent },
    { path: 'entrepreneurs', component: EntrepreneursComponent },


];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
