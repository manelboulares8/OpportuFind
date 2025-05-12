// Add these at the top of your dashboard component
interface StatData {
  totalOffres: number;
  totalCandidatures: number;
  pendingCandidatures: number;
  acceptedCandidatures: number;
  rejectedCandidatures: number;
}

interface SecteurData {
  [key: string]: number;
}

interface TrendData {
  [key: string]: number;
}