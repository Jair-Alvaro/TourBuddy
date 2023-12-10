import { Component, OnInit } from '@angular/core';
import { MapaService } from '../services/mapa.service';
import { icon, Map, marker, tileLayer, polyline, LatLngExpression } from 'leaflet';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css'],
})
export class MapaComponent implements OnInit {
  geo: LatLngExpression | undefined;
  map: Map | undefined;
  markers: any[] = [];
  constructor(private placeSvc: MapaService) {}

  ngOnInit() {
    setTimeout(() => {
      console.log(this.placeSvc.userLocation);
      this.geo = this.placeSvc.userLocation;
      this.placeSvc.getMapMarkers("arequipa").subscribe((markers) => {
        console.log('Markers in MapaComponent:', markers);
        this.markers = markers;
        
        if (this.markers.length > 0) {
          this.geo = this.markers[0].latLng; // Establece el primer marcador como el centro del mapa
        }
  
        this.initMap();
        this.addMarkers();
        this.drawRoute();
      });
    }, 2000);
  }

  private initMap() {
    if (!this.geo) {
      return;
    }
    this.map = new Map('map').setView(this.geo, 13);
    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
    // Agrega un listener de evento 'load' para asegurarte de que el mapa esté cargado completamente
    this.map.on('load', () => {
      this.addMarkers();
      this.drawRoute();
    });
  }

  private addMarkers() {
    if (!this.map) {
      return;
    }
  
    // Icono para los marcadores
    const defaultIcon = icon({
      iconUrl: './assets/marker-icon2.png',
      iconSize: [20, 30]
    });
  
    // Agrega marcadores a partir de los datos en el servicio
    this.markers.forEach((markerData, index) => {
      marker(markerData.latLng, { icon: defaultIcon }).addTo(this.map!).bindPopup(markerData.popupContent);
    });
  }

  private drawRoute() {
    const userLocation = this.placeSvc.userLocation;
    if (userLocation && userLocation.length === 2 && this.map) {
      const latlngs = [userLocation, ...this.markers.map(markerData => markerData.latLng)];
      polyline(latlngs, { color: 'red', dashArray: '5, 10', weight: 2 }).addTo(this.map);
    }
  }
  

  
}
