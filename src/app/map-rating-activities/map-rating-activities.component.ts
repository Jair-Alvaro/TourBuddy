// map-rating-activities.component.ts
import { Component, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map-rating-activities',
  templateUrl: './map-rating-activities.component.html',
  styleUrls: ['./map-rating-activities.component.css']
})
export class MapRatingActivitiesComponent implements OnInit {
  @Input() location!: { lat: number; lng: number };
  @Input() rating!: number;
  @Input() activities!: string[];

  map: any;

  ngOnInit(): void {
    this.initializeMap();
  }

  private initializeMap(): void {
    this.map = L.map('map').setView([this.location.lat, this.location.lng], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    L.marker([this.location.lat, this.location.lng]).addTo(this.map)
      .bindPopup('¡Esta es la ubicación!')
      .openPopup();
  }
}
