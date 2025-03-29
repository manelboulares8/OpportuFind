export class Offre {
    idOffre!: number;            // Matches Long idOffre in Java
    titre!: string;
    localisation!: string;
    exigences!: string;
    description!: string;
    entrepreneurId?: number;     // Added to store the entrepreneurId (can be optional)
    entrepreneur?: any;    
    entrepreneurName?: string;   // Added to store the name of the entrepreneur
    // This will store the complete entrepreneur object
    date!: Date;
}