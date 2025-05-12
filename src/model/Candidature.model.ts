import { Offre } from "./offre.model";

export interface Candidature {
  idCandidature : number;
    offre: Offre;
    status: string;
      coverLetter?: string;
              cvUrl?: string;

 // Ajoute aussi le statut si nécessaire
    recruitmentDate:Date
    etudiant: {
        cvUrl?: string;

          email: string;

      idEtudiant: number;
      fullName?: string;
      // Add other properties of `Etudiant` that are needed here
    };
  }
  