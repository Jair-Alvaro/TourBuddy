// auth.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;

  login(username: string, password: string): boolean {
    // Simula la lógica de inicio de sesión (puedes personalizar esto según tus necesidades)
    if (username === 'usuario1' && password === '123456789') {
      this.isAuthenticated = true;
      return true;
    }
    return false;
  }

  logout() {
    // Lógica de cierre de sesión
    this.isAuthenticated = false;
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }
}
