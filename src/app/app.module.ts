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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AjouterOffreComponent } from './ajouter-offre/ajouter-offre.component';
import { ListerOffreComponent } from './lister-offre/lister-offre.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { ModifierOffreComponent } from './modifier-offre/modifier-offre.component';
import { ToastrModule } from 'ngx-toastr';
import { UserProfileComponent } from './user-profile/user-profile.component';

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
    ErrorComponent,
    AjouterOffreComponent,
    ListerOffreComponent,
    WelcomePageComponent,
    ModifierOffreComponent,
    UserProfileComponent,
 

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
      BrowserAnimationsModule,
      HttpClientModule,
      MatSidenavModule,
      MatListModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatIconModule,
      ToastrModule.forRoot({ // Configuration globale de ngx-toastr
        positionClass: 'toast-top-right', // Vous pouvez configurer la position et d'autres options ici
        preventDuplicates: true,
        timeOut: 3000,
        closeButton: true,
        progressBar: true
      })
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
