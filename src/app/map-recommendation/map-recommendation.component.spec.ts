import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapRecommendationComponent } from './map-recommendation.component';

describe('MapRecommendationComponent', () => {
  let component: MapRecommendationComponent;
  let fixture: ComponentFixture<MapRecommendationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MapRecommendationComponent]
    });
    fixture = TestBed.createComponent(MapRecommendationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
