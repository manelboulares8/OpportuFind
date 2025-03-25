import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastModule } from 'primeng/toast';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Importer HttpClientModule
import { AuthService } from './services/auth.service';
import { AboutComponent } from './about/about.component';
import { CategoryComponent } from './category/category.component';
import { ContactComponent } from './contact/contact.component';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { JobListComponent } from './job-list/job-list.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { ErrorComponent } from './error/error.component'; // Assure-toi que ton AuthService est bien importé
import { MessageService } from 'primeng/api';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    AuthentificationComponent,
    AboutComponent,
    CategoryComponent,
    ContactComponent,
    JobDetailComponent,
    JobListComponent,
    TestimonialComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule, // Ajouter HttpClientModule ici
    ReactiveFormsModule,  // Ajouter ReactiveFormsModule dans les imports
    ToastModule,
      // Assure-toi que RouterModule est ici

  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
