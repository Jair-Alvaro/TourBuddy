import { Component } from '@angular/core';
import { RecommendationService } from '../services/recommendation.service';
import { icon, Map, marker, tileLayer, LatLngExpression } from 'leaflet';

@Component({
  selector: 'app-map-recommendation',
  templateUrl: './map-recommendation.component.html',
  styleUrls: ['./map-recommendation.component.css']
})
export class MapRecommendationComponent {
  geo: LatLngExpression | undefined;
  map: Map | undefined;
  markers: any[] = [];

  constructor(private service: RecommendationService) {}

  ngOnInit() {
    setTimeout(() => {
      this.geo = this.service.userLocation;
      this.initMap();
      this.addMarker();
      this.service.markersChanged.subscribe((markers) => {
        this.service.sortedPlaces = markers;
        //this.initMap();
        this.addNearbyMarkers();
      }); // Agrega marcadores cercanos después de que se carga la ubicación del usuario
    }, 2000);
  }

  private initMap() {
    if (!this.geo) {
      return;
    }
    this.map = new Map('map').setView(this.geo, 14);
    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
  }

  private addMarker() {
    if (this.map && this.geo) {
      const customIcon = icon({
        iconUrl: './assets/userLocation.png', // Ruta al ícono que deseas utilizar
        iconSize: [30, 30],
      });
      marker(this.geo, { icon: customIcon }).addTo(this.map);
    }
  }

  private addNearbyMarkers() {
    // Asegúrate de que los lugares cercanos y el mapa se hayan cargado antes de intentar agregar los marcadores
    if (this.map && this.service.sortedPlaces) {
      this.service.sortedPlaces.forEach(place => {
        const placeLatLng: LatLngExpression = [place.latitude, place.longitude];
        const distanceThreshold = 4; // Umbral de distancia en kilómetros
        const distance = place.distance || 0; // Si place.distance es undefined, establece la distancia en 0
        // Agrega el marcador solo si la distancia es inferior al umbral
        if (distance < distanceThreshold) {
          // Puedes personalizar el icono según tus necesidades
          const placeIcon = icon({
            iconUrl: './assets/marker-icon2.png',
            iconSize: [20, 30],
          });
  
          // Crea el marcador y agrega el pop-up
          const markerInstance = marker(placeLatLng, { icon: placeIcon });
  
          // Verifica que this.map sea un objeto Map antes de agregar el marcador
          if (this.map) {
            markerInstance.addTo(this.map);
            markerInstance.bindPopup(`<b>${place.name}</b><br>Distance: ${distance.toFixed(2)} km`);
  
            // Agrega un evento de clic al marcador para abrir el pop-up
            markerInstance.on('click', () => {
              markerInstance.openPopup();
            });
          }
        }
      });
    }
  }
  
  
  
}
