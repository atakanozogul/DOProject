import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { Crew } from './models/crew.model';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CrewListComponent } from './crew-list/crew-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NavbarComponent, SidebarComponent, CrewListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'digitall-ocean';
  crews: Crew[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.crews = this.dataService.getCrews();
  }
}