import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
declare var bootstrap: any;

@Component({
  selector: 'app-crew-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './crew-list.component.html',
  styleUrls: ['./crew-list.component.css']
})
export class CrewListComponent {
  @Input() crews: any[] = [];

  selectedCrew: any;

  viewCrewCard(crew: any) {
    // Tayfa kart sayfasına yönlendirme işlemi
  }

  editCrew(crew: any) {
    // Tayfa düzenleme işlemi (popup açma)
  }

  deleteCrew(crew: any) {
    // Tayfa silme işlemi
    this.crews = this.crews.filter(c => c !== crew);
  }

  viewCertificates(crew: any) {
    this.selectedCrew = crew;
    const modal = new bootstrap.Modal(document.getElementById('certificatesModal'));
    modal.show();
  }
}