import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CrewListComponent } from './crew-list/crew-list.component';
import { DataService } from './services/data.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    CrewListComponent
  ],
  imports: [
    BrowserModule,
    CrewListComponent,
    NavbarComponent
],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }