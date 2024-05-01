import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgDetailComponent } from './img-detail.component';

describe('ImgDetailComponent', () => {
  let component: ImgDetailComponent;
  let fixture: ComponentFixture<ImgDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImgDetailComponent]
    });
    fixture = TestBed.createComponent(ImgDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
