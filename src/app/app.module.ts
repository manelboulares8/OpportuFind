import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Importer HttpClientModule
import { AuthService } from './services/auth.service'; // Assure-toi que ton AuthService est bien importé

@NgModule({
  declarations: [
    AppComponent,
    AuthentificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule, // Ajouter HttpClientModule ici
    ReactiveFormsModule,  // Ajouter ReactiveFormsModule dans les imports

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
