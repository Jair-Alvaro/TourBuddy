// app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';
import { ResourcesComponent } from './resources/resources.component';
import { ExperiencesComponent } from './experiences/experiences.component';
import { ResourceDetailsComponent } from './resource-details/resource-details.component';
import { ToursComponent } from './tours/tours.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { ProfileComponent } from './profile/profile.component';
import { RutaComponent } from './ruta/ruta.component';
import { MapaComponent } from './mapa/mapa.component';
import { RutaDetalleComponent } from './ruta-detalle/ruta-detalle.component';

// app-routing.module.ts

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'recursos', component: ResourcesComponent, canActivate: [AuthGuard] },
  { path: 'resource-details/:id', component: ResourceDetailsComponent },
  { path: '', redirectTo: '/resources', pathMatch: 'full' }, 
  { path: 'experiencias', component: ExperiencesComponent, canActivate: [AuthGuard] },
  { path: 'rutas', component: ToursComponent, canActivate: [AuthGuard] },
  { path: 'ruta-detalle/:province', component: RutaDetalleComponent, canActivate: [AuthGuard] },
  { path: 'recomendaciones', component: RecommendationsComponent, canActivate: [AuthGuard] },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
