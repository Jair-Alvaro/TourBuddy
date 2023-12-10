import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RutaService {

  constructor(private firestore: AngularFirestore) { }

  getItems(): Observable<any[]> {
    
    const resourcesFirebase = this.firestore.collection('places');
    return resourcesFirebase.valueChanges();
  }

}
