import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Offre } from '../../model/offre.model';
import { OffreService } from '../services/offre.service';
import { EntrepreneurService } from '../services/entrepreneur.service';

@Component({
  selector: 'app-job-list',
  standalone: false,
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  offres!: Offre[];

  constructor(
    private router: Router,
    private offreService: OffreService,
    private entrepreneurService: EntrepreneurService, // Injecting the entrepreneur service
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.chargerOffres();
  }

  chargerOffres(): void {
    this.offreService.getOffres().subscribe(
      (off) => {
        this.offres = off;

        // For each offer, fetch the entrepreneur ID and the entrepreneur's name
        this.offres.forEach((offre) => {
          this.offreService.getEntrepreneurIdByOfferId(offre.idOffre).subscribe(
            (entrepreneurId) => {
              console.log(entrepreneurId)
              // Fetch the entrepreneur's name using the ID
              this.entrepreneurService.getEntrepreneurById(entrepreneurId).subscribe(
                (entrepreneur) => {
                  // Set the entrepreneur name in the offer
                  offre.entrepreneurName = entrepreneur?.fullName || 'Unknown';
                },
                (error) => {
                  console.error('Error fetching entrepreneur details', error);
                  offre.entrepreneurName = 'Unknown'; // Handle error if fetching the name fails
                }
              );
            },
            (error: any) => {
              console.error('Error fetching entrepreneur ID', error);
              offre.entrepreneurName = 'Unknown'; // Handle error if fetching the ID fails
            }
          );
        });
      },
      (error) => {
        this.toastr.error('Erreur lors du chargement des offres.', 'Erreur');
      }
    );
  }
}