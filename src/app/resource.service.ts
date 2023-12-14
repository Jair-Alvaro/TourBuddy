import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  constructor(private firestore: AngularFirestore) {}

  getItems(): Observable<any[]> {
    const resourcesFirebase = this.firestore.collection('places');
    return resourcesFirebase.valueChanges();
  }

  getItemsById(code: number): Observable<any[]> {
    return this.firestore.collection('places', ref => ref.where('code', '==', code)).valueChanges();
  }

  // Obtén los comentarios utilizando collection() en lugar de collectionGroup()
  getCommentsForPlace(resourceId: string): Observable<any[]> {
    console.log(resourceId);
    return this.firestore.collection(`places/${resourceId}/comments`)
      .snapshotChanges()
      .pipe(
        catchError((error) => {
          console.error('Error fetching comments:', error);
          return throwError(error);
        })
      );
  }
}