export interface User {
    id: number;
    idEtudiant:number;
    idEntrepreneur:number;
    fullName: string;
    email: string;
    password: string;
    role: 'entrepreneur' | 'etudiant';
    localisation?: string;
    secteur?: string;
    aboutUs?: string;
    university?: string;
    parcours?: string;
    cvUrl?: string;
  }
  