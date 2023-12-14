// profile.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private userDataSubject = new BehaviorSubject<any>({ username: 'NombreUsuario', email: 'correo@ejemplo.com' });

  getUserData() {
    return this.userDataSubject.asObservable();
  }

  updateUserData(data: any) {
    this.userDataSubject.next(data);
  }
}
