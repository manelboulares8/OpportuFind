import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthentificationComponent } from './authentification/authentification.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'authentification', component: AuthentificationComponent }, 
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Page d'accueil par défaut
  { path: 'home', component: HomeComponent }, // Ajoute cette ligne pour que 'home' fonctionne

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
