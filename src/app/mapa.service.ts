// mapa.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MapaService {
  private rutaSubject = new BehaviorSubject<any[]>([]);
  ruta$ = this.rutaSubject.asObservable();

  actualizarRuta(ruta: any[]) {
    this.rutaSubject.next(ruta);
  }
}
