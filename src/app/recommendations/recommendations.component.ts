import { Component } from '@angular/core';
import { RecommendationService } from '../services/recommendation.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent {
  isButtonSelected: boolean = false;
  selectedButton: string = '1';
  nearbyPlaces$: Observable<any[]>;
  selectButton() {
    this.isButtonSelected = true;
  }

  deselectButton() {
    this.isButtonSelected = false;
  }
  constructor(private service: RecommendationService) {
    // Obtén el observable de lugares ordenados y suscríbete a él
    this.nearbyPlaces$ = this.service.markersChanged;
  }
}
