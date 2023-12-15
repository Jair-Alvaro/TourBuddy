import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityRecommendationComponent } from './activity-recommendation.component';

describe('ActivityRecommendationComponent', () => {
  let component: ActivityRecommendationComponent;
  let fixture: ComponentFixture<ActivityRecommendationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivityRecommendationComponent]
    });
    fixture = TestBed.createComponent(ActivityRecommendationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
