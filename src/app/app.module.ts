import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { ResourcesComponent } from './resources/resources.component';
import { ExperiencesComponent } from './experiences/experiences.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { ToursComponent } from './tours/tours.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { ResourceCardComponent } from './resource-card/resource-card.component';
import { ResourceDetailsComponent } from './resource-details/resource-details.component';
import { ResourceService } from './resource.service';
import { DescriptionCommentsComponent } from './description-comments/description-comments.component';
import { MapRatingActivitiesComponent } from './map-rating-activities/map-rating-activities.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment';

import { RutaComponent } from './ruta/ruta.component';
import { MapaComponent } from './mapa/mapa.component';
import { DescripcionComponent } from './descripcion/descripcion.component';
import { ComentarioComponent } from './comentario/comentario.component';
import { MapaService } from './mapa.service';
import { MapOptionComponent } from './map-option/map-option.component';
import { RutaDetalleComponent } from './ruta-detalle/ruta-detalle.component';
import { ProfileService } from './profile.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MapRecommendationComponent } from './map-recommendation/map-recommendation.component';
import { ActivityRecommendationComponent } from './activity-recommendation/activity-recommendation.component'; // Agregado



@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    RegisterComponent,
    ResourcesComponent,
    ExperiencesComponent,
    RecommendationsComponent,
    ToursComponent,
    ProfileComponent,
    ResourceCardComponent,
    ResourceDetailsComponent,
    DescriptionCommentsComponent,
    MapRatingActivitiesComponent,
    RutaComponent,
    MapaComponent,
    DescripcionComponent,
    ComentarioComponent,
    MapOptionComponent,
    RutaDetalleComponent,
    MapRecommendationComponent,
    ActivityRecommendationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    NgbModule,
  ],
  providers: [
    AuthService, 
    AuthGuard,
    ResourceService,
    ProfileService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
