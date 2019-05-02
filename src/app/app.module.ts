import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { VideoComponent } from './video/video.component';
import { ExternalWebpageComponent } from './external-webpage/external-webpage.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    VideoComponent,
    ExternalWebpageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
