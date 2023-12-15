// src/app/resource-details/resource-details.component.ts
import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
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
    comments: [],
    latitud: 0,
    longitud: 0,
    rating: 0,
    activities: [],
  };
  comments:any[] = [];
  // Nueva variable para almacenar la descripción completa
  fullDescription: string = '';

  // Nueva variable para controlar la cantidad de texto mostrado
  shownDescription: string = '';
  descriptionLimit: number = 1000; // Ajusta según tu preferencia
  isDescriptionExpanded: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private resourceService: ResourceService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    const resourceId = this.route.snapshot.paramMap.get('id');

    if (resourceId !== null && resourceId !== undefined) {
      const resourceCode = +resourceId;

      if (!isNaN(resourceCode)) {
        // Obtener detalles del recurso
        this.resourceService.getItemsById(resourceCode).subscribe((details) => {
          this.resource = details[0];
          console.log('Resource Details:', this.resource);

          // Simulación: Asigna la descripción completa
          this.fullDescription = this.resource.description;
          // Inicialmente, muestra solo una parte de la descripción
          this.shownDescription = this.fullDescription.slice(0, this.descriptionLimit);

          // Obtener comentarios de la subcolección
          this.resourceService.getCommentsForPlace(resourceId).subscribe(
            (comments) => {
              console.log('Comments from Firestore:', comments);

              this.ngZone.run(() => {
                this.resource.comments = comments.map((comment) => {
                  return {
                    id: comment.payload.doc.id,
                    comment: comment.payload.doc.data().comment,
                    created_at: comment.payload.doc.data().created_at,
                    user: comment.payload.doc.data().user,
                  };
                });

                console.log('Updated Resource Details:', this.resource);
                this.cdr.markForCheck();
              });
            },
            (error) => {
              console.error('Error fetching comments:', error);
            }
          );
        },
        (error) => {
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

  loadAllImages(): void {
    // Obtén todas las imágenes de la galería
    const allImages = this.resource.gallery;
    // Lógica para cargar todas las imágenes
    this.resource.gallery = allImages;
  }

  loadMoreDescription(): void {
    if (this.isDescriptionExpanded) {
      // Si la descripción ya está expandida, vuelve a mostrar solo una parte
      this.shownDescription = this.fullDescription.slice(0, this.descriptionLimit);
    } else {
      // Si la descripción no está expandida, muestra la descripción completa
      this.shownDescription = this.fullDescription;
    }

    // Cambia el estado de expansión
    this.isDescriptionExpanded = !this.isDescriptionExpanded;
  }
}

