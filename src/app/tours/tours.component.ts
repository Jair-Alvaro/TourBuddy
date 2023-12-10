import { Component } from '@angular/core';
import { RutaService } from '../services/ruta.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-tours',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.css']
})
export class ToursComponent {
  routesFirebase!: Observable<any[]>;
  constructor(private routeFirebase: RutaService){ }

  ngOnInit():void{
    this.routesFirebase = this.routeFirebase.getItems();
  }
}
