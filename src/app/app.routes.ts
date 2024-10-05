import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CertificatesComponent } from './certificates/certificates.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'certificates', component: CertificatesComponent }
];