// app.component.ts

import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public authService: AuthService) {}  // Inyecta el servicio en el constructor

  logout() {
    this.authService.logout();
    // Puedes redirigir a la página de inicio de sesión u otras acciones después de cerrar sesión
  }
}
