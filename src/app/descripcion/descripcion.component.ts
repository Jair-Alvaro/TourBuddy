import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-descripcion',
  templateUrl: './descripcion.component.html',
  styleUrls: ['./descripcion.component.css']
})
export class DescripcionComponent {
  @Output() meGusta = new EventEmitter<void>();
  @Output() comentarios = new EventEmitter<void>();
  @Output() accionOpc = new EventEmitter<void>();

  // Puedes agregar propiedades para controlar la visibilidad del botón opcional
  mostrarBotonOpcional = true;

  isExpanded: boolean = false;

  toggleExpansion() {
    this.isExpanded = !this.isExpanded;
  }
  darMeGusta() {
    this.meGusta.emit();
  }

  verComentarios() {
    this.comentarios.emit();
  }

  accionOpcional() {
    this.accionOpc.emit();
  }
}
