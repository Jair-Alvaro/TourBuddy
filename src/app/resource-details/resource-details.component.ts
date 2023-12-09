import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResourceService } from '../resource.service';

@Component({
  selector: 'app-resource-details',
  templateUrl: './resource-details.component.html',
  styleUrls: ['./resource-details.component.css'],
})
export class ResourceDetailsComponent implements OnInit {
  resource: any = {
    photo: '',
    gallery: [],
    name: '',
    description: '',
    comments: '',
    latitud: 0,
    longitud: 0,
    rating: 0,
    activities: [],
    // Agrega otras propiedades según sea necesario
  };

  constructor(
    private route: ActivatedRoute,
    private resourceService: ResourceService
  ) {}

  ngOnInit(): void {
    const resourceId = this.route.snapshot.paramMap.get('id');

    if (resourceId !== null && resourceId !== undefined) {
      const resourceCode = +resourceId;

      if (!isNaN(resourceCode)) {
        this.resourceService.getItemsById(resourceCode).subscribe(details => {
          this.resource = details[0];
          console.log(this.resource)
        }, error => {
          console.error('Error fetching resource details:', error);
        });
      } else {
        console.error('Invalid resource code:', resourceCode);
      }
    } else {
      console.error('No valid resource ID found.');
    }
  }

  showImage(image: string): void {
    // Lógica para mostrar la imagen
  }
}
