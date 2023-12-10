import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;

  constructor(private auth: AngularFireAuth) {}

  async login(username: string, password: string): Promise<void> {
    await this.auth.signInWithEmailAndPassword(username, password);
    this.isAuthenticated = true;
    console.log('Usuario autenticado:', this.isAuthenticated);
  }

  async logout(): Promise<void> {
    await this.auth.signOut();
    this.isAuthenticated = false;
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }
}
