import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  error: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  async login(username: string, password: string) {
    try {
      const loginSuccessful = await this.authService.login(username, password);

      if (loginSuccessful) {
        this.router.navigate(['/recursos']); // Redirige al usuario a la ruta de recursos
      } else {
        this.error = 'Credenciales incorrectas. Por favor, inténtalo de nuevo.';
        setTimeout(() => {
          this.error = null;
        }, 3000);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}