import { Component } from '@angular/core';
import { CrewsComponent } from '../crews/crews.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CrewsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor() {}

  ngOnInit() {}
}
