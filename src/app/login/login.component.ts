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

  async login(username: string, password: string) {
    this.authService.login(username, password)
      .then(() => {
        // La autenticación fue exitosa, redirige a la página de recursos
        this.router.navigate(['/']);
      })
      .catch((error) => {
        // Maneja el error de inicio de sesión, puedes mostrar un mensaje de error al usuario
        console.error('Error de inicio de sesión:', error.code, error.message);
        return false;
      });
  }

  logout() {
    this.authService.logout()
      .then(() => {
        // La desconexión fue exitosa, redirige a la página principal u otra página según tu configuración
        this.router.navigate(['/']);
      })
      .catch((error) => {
        // Maneja el error de cierre de sesión si es necesario
        console.error('Error al cerrar sesión:', error);
      });
  }
}
