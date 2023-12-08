// description-comments.component.ts

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-description-comments',
  templateUrl: './description-comments.component.html',
  styleUrls: ['./description-comments.component.css']
})
export class DescriptionCommentsComponent {
  @Input() comments!: string[]; // Usamos ! para indicar que será inicializado antes de su uso
  description!: string; // Usamos ! para indicar que será inicializado antes de su uso

  constructor() {
    // Inicializa tu lógica aquí si es necesario
  }
}
