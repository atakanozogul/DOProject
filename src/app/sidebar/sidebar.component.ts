import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataService } from '../services/data.service';
import { Crew } from '../models/crew.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Output() crewAdded = new EventEmitter<Crew>();
  certificateTypes: any;

  constructor(private dataService: DataService) {
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
      certificates: [
        {
          certificateType: (document.getElementById('certificateType') as HTMLSelectElement).value,
          issueDate: (document.getElementById('issueDate') as HTMLInputElement).value,
          expiryDate: (document.getElementById('expiryDate') as HTMLInputElement).value
        }
      ]
    };
    this.dataService.addCrew(newCrew);
    this.crewAdded.emit(newCrew);
  }
}