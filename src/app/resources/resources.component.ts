// src/app/resources/resources.component.ts
import { Component, OnInit } from '@angular/core';
import { ResourceService } from '../resource.service'; // Importa el servicio

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {
  resources!: any[]; // Define una propiedad para almacenar los recursos

  constructor(private resourceService: ResourceService) { }

  ngOnInit(): void {
    this.resources = this.resourceService.getResources(); // Obtiene los recursos del servicio
  }
}
