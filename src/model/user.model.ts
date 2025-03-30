export interface User {
    id: number;
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
  