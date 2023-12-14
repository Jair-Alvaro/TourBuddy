// register.component.ts

import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registrationSuccessful: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  async register(username: string, email: string, password: string) {
    try {
      const registrationSuccessful = await this.authService.register(username, email, password);

      if (registrationSuccessful) {
        // Registro exitoso, muestra una alerta y redirige a la página de recomendaciones
        this.registrationSuccessful = true;
        setTimeout(() => {
          this.registrationSuccessful = false;
          this.router.navigate(['/recomendaciones']);
        }, 3000); // Cierra la alerta después de 3 segundos y redirige
      }
    } catch (error) {
      console.error('Error during registration:', error);
      // Maneja el error como desees (puedes mostrar un mensaje de error adicional, etc.)
    }
  }
}
