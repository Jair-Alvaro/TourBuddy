// login.component.ts

import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  login(username: string, password: string) {
    const loginSuccessful = this.authService.login(username, password);

    if (loginSuccessful) {
      this.router.navigate(['/recursos']);
    } else {
      // Muestra un mensaje de error o realiza acciones adicionales en caso de fallo de inicio de sesión
    }
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/']);  // Asegúrate de que esta ruta coincida con la configuración de tu archivo de rutas
  }
}
