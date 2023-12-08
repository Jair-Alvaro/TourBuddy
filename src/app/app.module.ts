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
    MapRatingActivitiesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    AuthService, 
    AuthGuard,
    ResourceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
