import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-certificates',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.css']
})
export class CertificatesComponent {
  certificateTypes: any[] = [];
  newCertificateType = { name: '', description: '' };

  constructor(private dataService: DataService) {
    this.certificateTypes = this.dataService.getCertificateTypes();
  }

  addCertificateType() {
    this.dataService.addCertificateType({ ...this.newCertificateType });
    this.newCertificateType = { name: '', description: '' };
  }

  deleteCertificateType(index: number) {
    this.dataService.deleteCertificateType(index);
  }
}