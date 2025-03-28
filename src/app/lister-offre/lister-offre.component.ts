import { Component, OnInit } from '@angular/core';
import { Offre } from '../../model/offre.model';
import { OffreService } from '../services/offre.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lister-offre',
  standalone: false,
  templateUrl: './lister-offre.component.html',
  styleUrl: './lister-offre.component.css'
})
export class ListerOffreComponent implements OnInit{
  offres!:Offre[];
  constructor (private router :Router,private offreServices:OffreService,    private toastr: ToastrService,
  ){}
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
 ModifierOffre(id: number): void {
  // Récupérer l'offre à modifier depuis le backend
  this.offreServices.getOffreById(id).subscribe(
    (data) => {
      // Vous pouvez utiliser une redirection ou ouvrir un formulaire de modification
      // Par exemple, redirection vers la page de modification
      this.router.navigate(['/modifier', id], { state: { offre: data } });

      // Si vous voulez passer les données à un autre composant
      // Vous pouvez aussi utiliser un service ou un Store pour gérer les données partagées entre les composants

      // Optionnel : vous pouvez afficher une notification de succès
      this.toastr.success('L\'offre a été récupérée pour modification.', 'Succès');
    },
    (error) => {
      this.toastr.error('Erreur lors de la récupération de l\'offre.', 'Erreur');
    }
  );
}


}
