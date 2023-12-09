// map-rating-activities.component.ts
import { Component, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map-rating-activities',
  templateUrl: './map-rating-activities.component.html',
  styleUrls: ['./map-rating-activities.component.css']
})
export class MapRatingActivitiesComponent implements OnInit {
  @Input() latitud!: number;
  @Input() longitud!: number;
  @Input() rating!: number;
  @Input() activities!: string[];

  map: any;

  ngOnInit(): void {
    setTimeout(()=>{
      this.initializeMap();
    },2000)
    
  }

  private async initializeMap(): Promise<void> {
    console.log(this.latitud)
    this.map = L.map('map').setView([this.latitud, this.longitud], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    L.marker([this.latitud, this.longitud]).addTo(this.map)
      .bindPopup('¡Esta es la ubicación!')
      .openPopup();
  }
}
