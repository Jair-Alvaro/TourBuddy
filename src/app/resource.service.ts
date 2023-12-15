import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  private cache: any[] = [];
  constructor(private firestore: AngularFirestore) {}

  getItems(): Observable<any[]> {
    if (this.cache.length > 0) {
      // Si hay datos en caché, devuélvelos inmediatamente
      return of(this.cache);
    } else {
      // Si no hay datos en caché, realiza la solicitud a Firestore
      const resourcesFirebase = this.firestore.collection('places', ref => ref.limit(100));
      return resourcesFirebase.valueChanges().pipe(
        tap(data => {
          // Almacena los datos en caché después de la primera solicitud
          this.cache = data;
        }),
        catchError((error) => {
          console.error('Error fetching data:', error);
          return throwError(error);
        })
      );
    }
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