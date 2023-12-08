// src/app/resource.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  private resources = [
    {
      id: '1',
      name: 'Arequipa',
      image: 'https://static.eldiario.es/clip/f9be6840-c0c9-4b7b-a969-cf1066d0c638_16-9-discover-aspect-ratio_default_0.jpg',
      largeImage: 'https://static.eldiario.es/clip/f9be6840-c0c9-4b7b-a969-cf1066d0c638_16-9-discover-aspect-ratio_default_0.jpg',
      markerIcon: 'URL del ícono del marcador para Arequipa',
      distance: '10',
      rating: 4,
      comments: 20,
      description: 'Descripción de Arequipa',
      location: { lat: -16.409047, lng: -71.537451 }, // Coordenadas de Arequipa
      activities: ['Actividad 1 en Arequipa', 'Actividad 2 en Arequipa', 'Actividad 3 en Arequipa'],
      thumbnailImages: [
        'https://st2.depositphotos.com/1473952/6985/i/450/depositphotos_69852069-stock-photo-arequipa-plaza-at-night.jpg',
        'https://www.cajaarequipa.pe/wp-content/uploads/2022/12/encendio-abol-arequipa.jpg',
        'https://blogs.ucontinental.edu.pe/wp-content/uploads/2019/08/aniversario-de-arequipa-cinco-personajes-que-crean-impacto-positivo-universidad-continental-miniatura-1.jpg',
        // ... más miniaturas si es necesario
      ],
    },
    {
      id: '2',
      name: 'Cuzco',
      image: 'https://www.perurail.com/wp-content/uploads/2017/10/Foto-1_Machu-Picchu-city-wonder-of-the-world-Cusco-Peru.jpg',
      largeImage: 'https://www.perurail.com/wp-content/uploads/2017/10/Foto-1_Machu-Picchu-city-wonder-of-the-world-Cusco-Peru.jpg',
      markerIcon: 'URL del ícono del marcador para Cuzco',
      distance: '15',
      rating: 5,
      comments: 30,
      description: 'Descripción de Cuzco',
      location: { lat: -13.516574, lng: -71.978918 }, // Coordenadas de Cuzco
      activities: ['Actividad 1 en Cuzco', 'Actividad 2 en Cuzco', 'Actividad 3 en Cuzco'],
      thumbnailImages: [
        'URL miniatura 1 para Arequipa',
        'URL miniatura 2 para Arequipa',
        'URL miniatura 3 para Arequipa',
        // ... más miniaturas si es necesario
      ],
    },
    {
      id: '3',
      name: 'Lima',
      image: 'https://blogskystorage.s3.amazonaws.com/2022/02/viajar-a-lima-1536x1024.jpeg',
      largeImage: 'https://blogskystorage.s3.amazonaws.com/2022/02/viajar-a-lima-1536x1024.jpeg',
      markerIcon: 'URL del ícono del marcador para Lima',
      distance: '32',
      rating: 5,
      comments: 30,
      description: 'Descripción de Lima',
      location: { lat: -12.046374, lng: -77.042793 }, // Coordenadas de Lima
      activities: ['Actividad 1 en Lima', 'Actividad 2 en Lima', 'Actividad 3 en Lima'],
      thumbnailImages: [
        'URL miniatura 1 para Arequipa',
        'URL miniatura 2 para Arequipa',
        'URL miniatura 3 para Arequipa',
        // ... más miniaturas si es necesario
      ],
    },
    // ... otros recursos
  ];

  getResources() {
    return this.resources;
  }

  getResourceById(id: string) {
    return this.resources.find(resource => resource.id === id);
  }
}
