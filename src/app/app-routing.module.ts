import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideoComponent } from './video/video.component';
import { HomeComponent } from './home/home.component';
import { ExternalWebpageComponent } from './external-webpage/external-webpage.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'video/:id', component: VideoComponent },
  { path: 'external', component: ExternalWebpageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { enableTracing: false }) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
