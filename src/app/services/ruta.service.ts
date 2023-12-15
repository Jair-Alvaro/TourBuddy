import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class RutaService {

  constructor(private firestore: AngularFirestore) { }

  getItems(): Observable<any[]> {
    return this.firestore.collection('places').valueChanges();
  }
  getUniqueDepartmentsWithProvinces(): Observable<any[]> {
    return this.getItems().pipe(
      map(places => {
        const departmentsMap = new Map<string, Set<string>>();

        places.forEach(place => {
          const department = place.department;
          const province = place.province;

          if (!departmentsMap.has(department)) {
            departmentsMap.set(department, new Set<string>());
          }

          const provinces = departmentsMap.get(department);
          if (provinces) {
            provinces.add(province);
          }
        });

        return Array.from(departmentsMap, ([department, provinces]) => ({ department, provinces: Array.from(provinces) }));
      })
    );
  }
}
