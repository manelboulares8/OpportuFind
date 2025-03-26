import { Component, OnInit } from '@angular/core';
import { Offre } from '../../model/offre.model';
import { OffreService } from '../services/offre.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lister-offre',
  standalone: false,
  templateUrl: './lister-offre.component.html',
  styleUrl: './lister-offre.component.css'
})
export class ListerOffreComponent implements OnInit{
  offres!:Offre[];
  constructor (private router :Router,private offreServices:OffreService){}
  ngOnInit(): void {
this.chargerOffres();  
}
  chargerOffres() {
this.offreServices.getOffres().subscribe(off=>{
  console.log(off);
  this.offres=off;
})  }

supprimerOffre(o:Offre){
  let conf = confirm("Etes-vous sûr ?");
      if (conf) {
        this.offreServices.deleteOffre(o.idOffre).subscribe({
          next: () => {
            console.log("Offre supprimé");
            this.chargerOffres(); // Recharge la liste des étudiants
          },
          error: (err) => {
            console.error("Erreur lors de la suppression de l'offre", err);
          }
        });
      }
}


}
