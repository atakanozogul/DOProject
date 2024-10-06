import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../services/data.service';
import { Crew } from '../models/crew.model';
import { Certificate } from '../models/certificate.model';
import { CrewCertificate } from '../models/crew-certificate.model';
import { CertificatesComponent } from '../certificates/certificates.component';

declare var bootstrap: any;

@Component({
  selector: 'app-crew-list',
  standalone: true,
  imports: [CommonModule, FormsModule, CertificatesComponent],
  templateUrl: './crew-list.component.html',
  styleUrls: ['./crew-list.component.css']
})
export class CrewListComponent implements OnInit {
  @Input() crews: Crew[] = [];
  selectedCrew: Crew = {
    id: 0,
    firstName: '',
    lastName: '',
    nationality: '',
    title: '',
    daysOnBoard: 0,
    dailyRate: 0,
    currency: 'USD',
    totalIncome: 0,
    certificates: []
  };
  certificateTypes: Certificate[] = [];
  newCrewCertificates: CrewCertificate[] = [];
  crewCertificates: CrewCertificate[] = [];
  newCertificateType: Partial<Certificate> = { name: '', desc: '' };
  totalIncomesByCurrency: { [key: string]: number } = {};
  

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.crews = this.dataService.getCrews();
    this.certificateTypes = this.dataService.getCertificateTypes();
    this.calculateTotalIncomesByCurrency();
  }

  calculateTotalIncomesByCurrency(): void {
    this.totalIncomesByCurrency = this.crews.reduce((acc, crew) => {
      if (!acc[crew.currency]) {
        acc[crew.currency] = 0;
      }
      acc[crew.currency] += crew.totalIncome;
      return acc;
    }, {} as { [key: string]: number });
  }

  getCurrencies(): string[] {
    return Object.keys(this.totalIncomesByCurrency);
  }

  viewCrewCard(crew: Crew): void {
    this.selectedCrew = crew;
    const viewCrewCardModal = new bootstrap.Modal(document.getElementById('viewCrewCardModal'));
    viewCrewCardModal.show();
  }

  editCrew(crew: Crew): void {
    this.selectedCrew = { ...crew };

    this.selectedCrew.certificates = this.selectedCrew.certificates.map(cert => ({
      ...cert,
      certificateId: Number(cert.certificateId)
    }));

    this.newCrewCertificates = [...this.selectedCrew.certificates];
    const editModal = new bootstrap.Modal(document.getElementById('editCrewModal'));
    editModal.show();
  }

  saveCrew(): void {
    if (this.selectedCrew) {
      this.selectedCrew.certificates = [...this.newCrewCertificates];
      this.dataService.updateCrew(this.selectedCrew);
      this.crews = this.dataService.getCrews();
      const editModal = bootstrap.Modal.getInstance(document.getElementById('editCrewModal'));
      editModal.hide();
      this.selectedCrew = {
        id: 0,
        firstName: '',
        lastName: '',
        nationality: '',
        title: '',
        daysOnBoard: 0,
        dailyRate: 0,
        currency: 'USD',
        totalIncome: 0,
        certificates: []
      }
    }
  }

  deleteCrew(crew: Crew): void {
    this.dataService.deleteCrew(crew.id);
    this.crews = this.dataService.getCrews();
  }

  viewCertificates(crew: Crew): void {
    const crewData = this.dataService.getCrewById(crew.id);
    if (crewData) {
      this.selectedCrew = crewData;
      this.updateCrewCertificates();
      const crewCertificatesModal = new bootstrap.Modal(document.getElementById('crewCertificatesModal'));
      crewCertificatesModal.show();
    } else {
      console.error('Crew not found');
    }
  }

  openCertificatesModal(): void {
    const certificatesModal = new bootstrap.Modal(document.getElementById('certificatesModal'));
    certificatesModal.show();
  }

  addCertificateType(): void {
    if (this.newCertificateType.name && this.newCertificateType.desc) {
      const newCertificate: Certificate = {
        id: Date.now(),
        name: this.newCertificateType.name,
        desc: this.newCertificateType.desc
      };
      this.dataService.addCertificateType(newCertificate);
      this.newCertificateType = { name: '', desc: '' };
      this.certificateTypes = this.dataService.getCertificateTypes();
    }
  }

  deleteCertificateType(index: number): void {
    this.dataService.deleteCertificateType(index);
    this.certificateTypes = this.dataService.getCertificateTypes();
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
      certificates: this.newCrewCertificates.map(cert => ({
        certificateId: cert.certificateId,
        issueDate: cert.issueDate,
        expiryDate: cert.expiryDate
      }))
    };
    this.dataService.addCrew(newCrew);
    this.crews = this.dataService.getCrews();
    this.newCrewCertificates = [];
  }

  addCertificateField(): void {
    this.newCrewCertificates.push({
      certificateId: 0,
      issueDate: '',
      expiryDate: ''
    });
  }

  onCertificateIdChange(event: any, index: number): void {
    this.newCrewCertificates[index].certificateId = parseInt(event, 10);
  }

  getCertificateName(certificateId: number): string {
    const certType = this.certificateTypes.find(cert => cert.id === certificateId);
    return certType ? certType.name : 'Unknown';
  }

  getCertificateDesc(certificateId: number): string {
    const certType = this.certificateTypes.find(cert => cert.id === certificateId);
    return certType ? certType.desc : 'Unknown';
  }

  private updateCrewCertificates(): void {
    if (this.selectedCrew) {
      this.crewCertificates = this.selectedCrew.certificates.map(crewCert => {
        const certType = this.certificateTypes.find(cert => cert.id === crewCert.certificateId);
        return {
          certificateId: crewCert.certificateId,
          issueDate: crewCert.issueDate,
          expiryDate: crewCert.expiryDate,
          name: certType?.name || '',
          desc: certType?.desc || ''
        };
      });
    }
  }
}