import { Component } from '@angular/core';
import { RecommendationService } from '../services/recommendation.service';
@Component({
  selector: 'app-activity-recommendation',
  templateUrl: './activity-recommendation.component.html',
  styleUrls: ['./activity-recommendation.component.css']
})
export class ActivityRecommendationComponent {
  activities: any[] | undefined;
  selectedActivityIds: string[] = [];
  places: any[] = [];
  constructor( private firestore: RecommendationService){}
  ngOnInit() {
    this.firestore.getActivities().subscribe((data: any[]) => {
      this.activities = data;
    });
  }
  onActivityClick(activityId: string) {
    const index = this.selectedActivityIds.indexOf(activityId);
    if (index !== -1) {
      this.selectedActivityIds.splice(index, 1);
    } else {
      this.selectedActivityIds.push(activityId);
    }
  
    this.loadPlaces();
  }
  
  loadPlaces() {
    this.places = []; // Limpiar lugares antes de cargar los nuevos
    
    this.selectedActivityIds.forEach(id => {
      if (id !== undefined) {
        this.firestore.getPlacesByActivityId(id!).subscribe((data: any[] | undefined) => {
          if (data !== undefined) {
            // Verificar si el lugar tiene todas las actividades seleccionadas
            const hasAllActivities = this.selectedActivityIds.every(activityId =>
              data.some(place => place.activities.includes(activityId))
            );
  
            // Agregar el lugar solo si tiene todas las actividades seleccionadas
            if (hasAllActivities) {
              this.places = [...this.places, ...data];
            }
          }
        });
      }
    });
  }
  
  isSelectedActivity(activityId: string): boolean {
    return this.selectedActivityIds.includes(activityId);
  }
    
}
