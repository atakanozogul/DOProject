import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { DataService } from './app/services/data.service';

bootstrapApplication(AppComponent, {
  providers: [DataService]
}).catch(err => console.error(err));