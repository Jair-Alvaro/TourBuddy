// resource-details.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResourceService } from '../resource.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-resource-details',
  templateUrl: './resource-details.component.html',
  styleUrls: ['./resource-details.component.css']
})
export class ResourceDetailsComponent implements OnInit {
  resource: any;
  resourceFirebase!: Observable<any[]>;
  constructor(
    private route: ActivatedRoute,
    private resourceService: ResourceService
  ) {}

  ngOnInit(): void {
    const resourceId = this.route.snapshot.paramMap.get('id');
    if (resourceId) {
      this.resourceFirebase = this.resourceService.getItemsById(resourceId);
    } else {
      // Maneja el caso en que no hay un ID de recurso válido
    }
  }

  showImage(image: string): void {
    // Lógica para mostrar la imagen
  }
}
