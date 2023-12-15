import { Component } from '@angular/core';
import { RutaService } from '../services/ruta.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-tours',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.css']
})
export class ToursComponent {
  departmentsWithProvinces!: Observable<any[]>;

  constructor(private rutaService: RutaService) { }

  ngOnInit(): void {
    this.departmentsWithProvinces = this.rutaService.getUniqueDepartmentsWithProvinces();
  }
}
