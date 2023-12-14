// auth.service.ts
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { ProfileService } from './profile.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;

  constructor(private auth: AngularFireAuth, private profileService: ProfileService) {
    const storedAuth = sessionStorage.getItem('auth');
    if (storedAuth) {
      this.isAuthenticated = JSON.parse(storedAuth);
    } else {
      this.auth.authState.subscribe((user) => {
        this.isAuthenticated = !!user;
        sessionStorage.setItem('auth', JSON.stringify(this.isAuthenticated));

        // Actualiza los datos del perfil cuando el usuario inicia sesión
        if (this.isAuthenticated) {
          this.profileService.updateUserData({
            username: user?.displayName || 'NombreUsuario',
            email: user?.email || 'correo@ejemplo.com',
          });
        }
      });
    }
  }

  getAuthState() {
    return this.auth.authState;
  }

  async login(email: string, password: string): Promise<boolean> {
    try {
      await this.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      await this.auth.signInWithEmailAndPassword(email, password);
      // Login exitoso
      this.isAuthenticated = true;
      sessionStorage.setItem('auth', JSON.stringify(this.isAuthenticated));
      return true;
    } catch (error) {
      console.error('Error during login:', error);
      // Devuelve false si hay un error durante el inicio de sesión
      return false;
    }
  }

  async register(username: string, email: string, password: string): Promise<boolean> {
    try {
      const userCredential = await this.auth.createUserWithEmailAndPassword(email, password);

      // Actualiza el nombre de usuario del usuario recién registrado
      await userCredential.user?.updateProfile({ displayName: username });

      // Registro exitoso
      this.isAuthenticated = true;
      sessionStorage.setItem('auth', JSON.stringify(this.isAuthenticated));
      return true;
    } catch (error) {
      console.error('Error during registration:', error);
      // Devuelve false si hay un error durante el registro
      return false;
    }
  }

  logout() {
    this.auth.signOut();
    this.isAuthenticated = false;
    sessionStorage.removeItem('auth');
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }
}
