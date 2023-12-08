// src/app/resources/resources.component.ts
import { Component, OnInit } from '@angular/core';
import { ResourceService } from '../resource.service'; // Importa el servicio
import { Observable } from 'rxjs';
@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {
  
  resourcesFirebase!: Observable<any[]>;
  constructor(private resourceService: ResourceService) { }

  ngOnInit(): void {
    this.resourcesFirebase = this.resourceService.getItems()
  }
}
