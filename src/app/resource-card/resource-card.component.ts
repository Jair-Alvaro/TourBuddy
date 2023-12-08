// resource-card.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-resource-card',
  templateUrl: './resource-card.component.html',
  styleUrls: ['./resource-card.component.css']
})
export class ResourceCardComponent {
  @Input() resource: any; // Ajusta el tipo según la estructura de tus datos
}
