import { Component } from '@angular/core';
import { MapaService } from '../services/mapa.service';
@Component({
  selector: 'app-map-option',
  templateUrl: './map-option.component.html',
  styleUrls: ['./map-option.component.css']
})
export class MapOptionComponent {
  isButtonSelected: boolean = false;
  selectedButton: string = '1';
  departments?: any;
  currentProvince!: string;
  constructor(private routes: MapaService) {

  }
  selectButton() {
    this.isButtonSelected = true;
  }

  deselectButton() {
    this.isButtonSelected = false;
  }
  ngOnInit(){
    this.routes.currentProvince.subscribe(province => {
      this.currentProvince = province;
    });
    this.routes.getCitys(this.currentProvince).subscribe((items) => {
      this.departments = items;
      console.log(this.departments)
    })
  }
}
