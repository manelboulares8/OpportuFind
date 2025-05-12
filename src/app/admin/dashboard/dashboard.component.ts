// dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { DashboardService } from '../../services/DashboardService';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { Router } from '@angular/router';

// Register all Chart.js components
Chart.register(...registerables);
// Add these interfaces for type safety
interface DashboardStats {
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

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective], // Add required imports
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],

})
export class DashboardComponent implements OnInit {
  // Stats Data with proper typing
  stats: DashboardStats = {
    totalOffres: 0,
    totalCandidatures: 0,
    pendingCandidatures: 0,
    acceptedCandidatures: 0,
    rejectedCandidatures: 0
  };
  
  // Chart Data with explicit types
  secteurChart: ChartData<'bar', number[], string> = {
    labels: [],
    datasets: [{
      data: [],
      label: 'Candidatures',
      backgroundColor: '#4e73df'
    }]
  };
  
  statusChart: ChartData<'pie', number[], string> = {
    labels: ['Pending', 'Accepted', 'Rejected'],
    datasets: [{
      data: [0, 0, 0],
      backgroundColor: ['#FFCE56', '#36A2EB', '#FF6384']
    }]
  };
  
  trendChart: ChartData<'line', number[], string> = {
    labels: [],
    datasets: [{
      label: 'Recruitments',
      data: [],
      fill: true,
      tension: 0.4,
      borderColor: '#4e73df',
      backgroundColor: 'rgba(78, 115, 223, 0.05)'
    }]
  };

  // Chart Options
  barOptions: ChartConfiguration['options'] = {
    responsive: true,
    indexAxis: 'y'
  };

  pieOptions: ChartConfiguration['options'] = {
    responsive: true
  };

  lineOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date'
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Count'
        }
      }
    }
  };

  constructor(private dashboardService: DashboardService,    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    // Load stats with type assertion
    this.dashboardService.getStats().subscribe((data: DashboardStats) => {
      this.stats = data;
      this.statusChart.datasets[0].data = [
        data.pendingCandidatures,
        data.acceptedCandidatures,
        data.rejectedCandidatures
      ];
    });

    // Load secteur data with type assertion
    this.dashboardService.getBySecteur().subscribe((data: SecteurData) => {
      this.secteurChart = {
        labels: Object.keys(data),
        datasets: [{
          data: Object.values(data) as number[],
          label: 'Candidatures',
          backgroundColor: '#4e73df'
        }]
      };
    });

    // Load trend data with type assertion
    this.dashboardService.getRecruitmentTrend().subscribe((data: TrendData) => {
      this.trendChart = {
        labels: Object.keys(data),
        datasets: [{
          label: 'Recruitments',
          data: Object.values(data) as number[],
          fill: true,
          tension: 0.4,
          borderColor: '#4e73df',
          backgroundColor: 'rgba(78, 115, 223, 0.05)'
        }]
      };
    });
  }

    // Navigation
  goToJobList() { this.router.navigate(['/job-list']); }
  goToJobDetail() { this.router.navigate(['/job-detail']); }
  goToHome() { this.router.navigate(['/dashboard']); }
  goToAbout() { this.router.navigate(['/about']); }
  goToAdd() { this.router.navigate(['/ajouter-offre']); }
  goToCategory() { this.router.navigate(['/category']); }
  goToTestimonial() { this.router.navigate(['/testimonial']); }
  goTo404() { this.router.navigate(['/error']); }
  goToContact() { this.router.navigate(['/contact']); }
  goToLogout() { localStorage.clear(); this.router.navigate(['/welcome']); }
  goToMy() { this.router.navigate(['/lister-offre']); }
  goToProfile() { this.router.navigate(['/profile']); }
  goToListerCandidatures() { this.router.navigate(['/candidatures']); }
  goToListerCandidaturesetu() { this.router.navigate(['/lister-candidaturesEtu']); }
  goToListerLesOffres() { this.router.navigate(['/offres']); }
  goToListerEtu() { this.router.navigate(['/etudiants']); }
  goToListerEnt() { this.router.navigate(['/entrepreneurs']); }

}