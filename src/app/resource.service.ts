// src/app/resource.service.ts
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection  } from '@angular/fire/compat/firestore';
import { getDoc } from '@angular/fire/firestore'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  constructor(private firestore: AngularFirestore) {}

  getItems(): Observable<any[]> {
    // Cambia 'tuColeccion' al nombre de tu colección en Firestore
    const resourcesFirebase = this.firestore.collection('places');
    return resourcesFirebase.valueChanges();
  }
  getItemsById(code: number): Observable<any> {
    return this.firestore.collection('places', ref => ref.where('code', '==', code)).valueChanges();
  }
}
