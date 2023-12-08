import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionCommentsComponent } from './description-comments.component';

describe('DescriptionCommentsComponent', () => {
  let component: DescriptionCommentsComponent;
  let fixture: ComponentFixture<DescriptionCommentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DescriptionCommentsComponent]
    });
    fixture = TestBed.createComponent(DescriptionCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
