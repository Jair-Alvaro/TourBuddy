import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LatLngExpression } from 'leaflet';
import { BehaviorSubject } from 'rxjs';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecommendationService {
  public userLocation?: LatLngExpression;
  public markers: { latLng: LatLngExpression; label: string }[] = [];
  public sortedPlaces: any[] = [];
  public markersChanged: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(
    []
  );

  constructor(private firestore: AngularFirestore) {
    this.getUserLocation();
  }

  public getUserLocation() {
    // navigator.geolocation.getCurrentPosition(({ coords }) => {
    //   //this.userLocation = [coords.latitude, coords.longitude];
    //   //Lima
    //   // this.userLocation = [-12.05196364388312, -77.03455031512652];
    //   //Tacna
    //   this.userLocation = [-18.008197169274418, -70.24164754029947]
    //   //Ica
    //   //this.userLocation = [-14.075092466066904, -75.73380824723986];
    //   this.getNearbyPlaces();
    // });
    this.userLocation = [-12.05196364388312, -77.03455031512652];
  }

  public getNearbyPlaces() {
    if (!this.userLocation) {
      return;
    }

    const placesCollection = this.firestore.collection('places');
    placesCollection.valueChanges().subscribe((places: any[]) => {
      // Calcula la distancia entre el usuario y cada lugar
      const placesWithDistance = places.map((place) => {
        const distance = this.calculateDistance(this.userLocation, [
          place.latitude,
          place.longitude,
        ]);
        return { ...place, distance };
      });
      // Ordena los lugares por distancia
      const sortedPlaces = placesWithDistance.sort(
        (a, b) => a.distance - b.distance
      );
      // Filtra los lugares cercanos (por ejemplo, aquellos a menos de 10 km)
      const nearbyPlaces = sortedPlaces.filter((place) => place.distance < 4); // Puedes ajustar el valor según tus necesidades
      // Emite los lugares cercanos, puedes suscribirte a esto desde los componentes
      this.markersChanged.next(nearbyPlaces);
    });
  }

  public getActivities() {
    return this.firestore
      .collection('activities', (ref) => ref.limit(10))
      .valueChanges();
  }

  getPlacesByActivityId(activityId: string | undefined): Observable<any[] | undefined> {
    if (!activityId) {
      // Manejar el caso en el que activityId sea undefined
      return of(undefined);
    }
  
    return this.firestore.collection('places', ref => ref.where('activities', 'array-contains', activityId).limit(30)).valueChanges();
  }
  

  private calculateDistance(
    point1: LatLngExpression | undefined,
    point2: LatLngExpression | undefined
  ): number {
    if (
      !point1 ||
      !point2 ||
      !Array.isArray(point1) ||
      !Array.isArray(point2)
    ) {
      return Number.POSITIVE_INFINITY;
    }

    const R = 6371; // Radio de la Tierra en kilómetros
    const dLat = this.degreesToRadians(point2[0] - point1[0]);
    const dLon = this.degreesToRadians(point2[1] - point1[1]);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.degreesToRadians(point1[0])) *
        Math.cos(this.degreesToRadians(point2[0])) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // Distancia en kilómetros

    return distance;
  }

  private degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }
}
