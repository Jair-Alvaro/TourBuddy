// app/ruta-detalle/ruta-detalle.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MapaService } from '../services/mapa.service';

@Component({
  selector: 'app-ruta-detalle',
  templateUrl: './ruta-detalle.component.html',
  styleUrls: ['./ruta-detalle.component.css']
})
export class RutaDetalleComponent implements OnInit {
  province: string = '';

  constructor(private route: ActivatedRoute, private mapaService: MapaService) { }

  ngOnInit(): void {
    
    this.route.paramMap.subscribe(params => {
      this.province = params.get('province') || '';  
      this.mapaService.updateProvince(this.province);
    });
  }
}
