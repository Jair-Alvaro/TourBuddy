// resource-details.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResourceService } from '../resource.service';

@Component({
  selector: 'app-resource-details',
  templateUrl: './resource-details.component.html',
  styleUrls: ['./resource-details.component.css']
})
export class ResourceDetailsComponent implements OnInit {
  resource: any;

  constructor(
    private route: ActivatedRoute,
    private resourceService: ResourceService
  ) {}

  ngOnInit(): void {
    const resourceId = this.route.snapshot.paramMap.get('id');
    if (resourceId) {
      this.resource = this.resourceService.getResourceById(resourceId);
    } else {
      // Maneja el caso en que no hay un ID de recurso válido
    }
  }

  showImage(image: string): void {
    // Lógica para mostrar la imagen
  }
}
