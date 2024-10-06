import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CrewListComponent } from './crew-list/crew-list.component';
import { DataService } from './services/data.service';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    CrewListComponent,
    NavbarComponent,
    SidebarComponent
],
  providers: [DataService]
})
export class AppModule { }