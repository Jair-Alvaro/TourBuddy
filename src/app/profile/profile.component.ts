// profile.component.ts
import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userData = { username: 'NombreUsuario', email: 'correo@ejemplo.com' };

  constructor(private profileService: ProfileService, private authService: AuthService) {}

  ngOnInit() {
    this.authService.getAuthState().subscribe((user) => {
      if (user) {
        // Actualiza los datos del perfil cuando el usuario cambia
        this.profileService.updateUserData({
          username: user.displayName || 'NombreUsuario',
          email: user.email || 'correo@ejemplo.com',
        });
      }
    });

    this.profileService.getUserData().subscribe((data) => {
      this.userData = data;
    });
  }
}
