import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MapaService {
  public userLocation?: [number, number];
  public markers: { latLng: [number, number]; label: string }[] = [];

  constructor(private firestore: AngularFirestore) {
    this.getUserLocation();
    // Agrega marcadores de ejemplo
  }

  public getUserLocation() {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        this.userLocation = [coords.latitude, coords.longitude];
      }
    );
  }

  public getCitys(province: string): Observable<any[]> {
    return this.firestore
      .collection('places', (ref) => ref.where('province', '==', province))
      .valueChanges();
  }

  public getMapMarkers(city: string): Observable<any[]> {
    return this.getCitys(city).pipe(
      map((items) => {
        console.log('Items from getMapMarkers:', items);  
        return items.map((item) => ({
          latLng: [item['latitude'], item['longitude']],
          popupContent: item['name'],
        }));
      })
    );
  }
  
}
