import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapRatingActivitiesComponent } from './map-rating-activities.component';

describe('MapRatingActivitiesComponent', () => {
  let component: MapRatingActivitiesComponent;
  let fixture: ComponentFixture<MapRatingActivitiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MapRatingActivitiesComponent]
    });
    fixture = TestBed.createComponent(MapRatingActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
