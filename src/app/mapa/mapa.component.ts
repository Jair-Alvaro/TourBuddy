import { Component, OnInit } from '@angular/core';
import { MapaService } from '../services/mapa.service';
import { icon, Map, marker, tileLayer, polyline, Tooltip, LatLngExpression } from 'leaflet';
import { LatLng, LatLngTuple } from 'leaflet';
import { latLng } from 'leaflet';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css'],
})
export class MapaComponent implements OnInit {
  geo: LatLngExpression | undefined;
  map: Map | undefined;
  markers: any[] = [];
  
  currentProvince: string = '';

  constructor(
    private placeSvc: MapaService
    ) {}

  ngOnInit() {
    setTimeout(() => {
      console.log(this.placeSvc.userLocation);
      this.geo = this.placeSvc.userLocation;
      this.placeSvc.currentProvince.subscribe(province => {
        this.currentProvince = province;
      });
      this.placeSvc.getMapMarkers(this.currentProvince).subscribe((markers) => {
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
    this.map = new Map('mapa').setView(this.geo, 13);
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
      const latlngs = this.markers.map(markerData => latLng(markerData.latLng));
  
      if (latlngs.length > 1) {
        const polylineOptions = { color: 'red', dashArray: '5, 10', weight: 2 };
        const polylineInstance = polyline(latlngs, polylineOptions).addTo(this.map);
  
        // Calcula la distancia total de la ruta
        const totalDistance = this.calculateTotalDistance(latlngs);
  
        // Divide la polilínea en segmentos más pequeños
        const segments = this.dividePolyline(polylineInstance, 20); // Ajusta el número según sea necesario
  
        segments.forEach((segment, index) => {
          if (index < segments.length - 1) {
            const segmentDistance = this.calculateDistance(segment[segment.length - 1], segments[index + 1][0]);
            const tooltipContent = `Distance: ${segmentDistance.toFixed(2)} km (of ${totalDistance.toFixed(2)} km)`;
  
            // Verifica si this.map está definido antes de agregar capas
            if (this.map) {
              polyline(segment, { color: 'transparent', opacity: 0, weight: 0 }).addTo(this.map)
                .bindTooltip(tooltipContent, { permanent: false, direction: 'center', opacity: 0.7 })
                .openTooltip();
            }
          }
        });
  
        // Aquí agregamos una comprobación para asegurarnos de que el mapa esté definido antes de intentar acceder a su centro
        if (this.map.getCenter()) {
          const center = this.map.getCenter();
          console.log('Map Center:', center);
        }
      }
    }
  }
  
  
  
  
  private dividePolyline(polylineInstance: L.Polyline, numSegments: number): LatLngExpression[][] {
    const latlngs = polylineInstance.getLatLngs() as LatLngExpression[];
    const totalPoints = latlngs.length;
    const pointsPerSegment = Math.floor(totalPoints / numSegments);
  
    const segments: LatLngExpression[][] = [];
    for (let i = 0; i < numSegments; i++) {
      const startIndex = i * pointsPerSegment;
      const endIndex = (i + 1) * pointsPerSegment;
      segments.push(latlngs.slice(startIndex, endIndex));
    }
  
    return segments;
  }
  private degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }
  
  private calculateDistance(latlng1: LatLngExpression, latlng2: LatLngExpression): number {
    const R = 6371; // Radio de la Tierra en kilómetros
  
    const latlngObj1 = latLng(latlng1);
    const latlngObj2 = latLng(latlng2);
  
    if (!latlngObj1 || !latlngObj2) {
      // Manejo de casos en los que las coordenadas son undefined
      return 0;
    }
  
    const dLat = this.degreesToRadians(latlngObj2.lat - latlngObj1.lat);
    const dLon = this.degreesToRadians(latlngObj2.lng - latlngObj1.lng);
  
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.degreesToRadians(latlngObj1.lat)) * Math.cos(this.degreesToRadians(latlngObj2.lat)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    const distance = R * c; // Distancia en kilómetros
  
    return distance;
  }
  
  private calculateTotalDistance(latlngs: LatLng[]): number {
    let totalDistance = 0;
  
    for (let i = 0; i < latlngs.length - 1; i++) {
      const segmentDistance = this.calculateDistance(latlngs[i], latlngs[i + 1]);
      totalDistance += segmentDistance;
    }
  
    return totalDistance;
  }
  
}
