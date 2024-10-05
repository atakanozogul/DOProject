import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../services/data.service';
import { Crew } from '../models/crew.model';
import { Certificate } from '../models/certificate.model';

declare var bootstrap: any;

@Component({
  selector: 'app-crew-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crew-list.component.html',
  styleUrls: ['./crew-list.component.css']
})
export class CrewListComponent implements OnInit {
  @Input() crews: Crew[] = [];
  selectedCrew: Crew | null = null;
  certificateTypes: Certificate[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.certificateTypes = this.dataService.getCertificateTypes();
  }

  viewCrewCard(crew: Crew): void {
    this.selectedCrew = crew;
    const viewCrewCardModal = new bootstrap.Modal(document.getElementById('viewCrewCardModal'));
    viewCrewCardModal.show();
  }

  editCrew(crew: Crew): void {
    this.selectedCrew = { ...crew };
    const editModal = new bootstrap.Modal(document.getElementById('editCrewModal'));
    editModal.show();
  }

  saveCrew(): void {
    if (this.selectedCrew) {
      const index = this.crews.findIndex(c => c.id === this.selectedCrew!.id);
      if (index !== -1) {
        this.crews[index] = this.selectedCrew;
        this.dataService.updateCrew(this.selectedCrew);
      }
      this.selectedCrew = null;
      const editModal = bootstrap.Modal.getInstance(document.getElementById('editCrewModal'));
      editModal.hide();
    }
  }

  deleteCrew(crew: Crew): void {
    const index = this.crews.findIndex(c => c.id === crew.id);
    if (index !== -1) {
      this.crews.splice(index, 1);
      this.dataService.deleteCrew(crew.id);
    }
  }

  viewCertificates(crew: Crew): void {
    this.selectedCrew = crew;
    const certificatesModal = new bootstrap.Modal(document.getElementById('certificatesModal'));
    certificatesModal.show();
  }

  openCertificatesModal(): void {
    const certificatesModal = new bootstrap.Modal(document.getElementById('certificatesModal'));
    certificatesModal.show();
  }

  addCrew(): void {
    const newCrew: Crew = {
      id: Date.now(),
      firstName: (document.getElementById('firstName') as HTMLInputElement).value,
      lastName: (document.getElementById('lastName') as HTMLInputElement).value,
      nationality: (document.getElementById('nationality') as HTMLInputElement).value,
      title: (document.getElementById('title') as HTMLInputElement).value,
      daysOnBoard: +(document.getElementById('daysOnBoard') as HTMLInputElement).value,
      dailyRate: +(document.getElementById('dailyRate') as HTMLInputElement).value,
      currency: (document.getElementById('currency') as HTMLSelectElement).value,
      totalIncome: +(document.getElementById('daysOnBoard') as HTMLInputElement).value * +(document.getElementById('dailyRate') as HTMLInputElement).value,
      certificates: [
        {
          certificateType: (document.getElementById('certificateType') as HTMLSelectElement).value,
          issueDate: (document.getElementById('issueDate') as HTMLInputElement).value,
          expiryDate: (document.getElementById('expiryDate') as HTMLInputElement).value
        }
      ]
    };
    this.dataService.addCrew(newCrew);
    this.crews.push(newCrew);
  }
}