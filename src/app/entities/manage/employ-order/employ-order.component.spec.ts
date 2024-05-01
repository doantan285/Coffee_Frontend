import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployOrderComponent } from './employ-order.component';

describe('EmployOrderComponent', () => {
  let component: EmployOrderComponent;
  let fixture: ComponentFixture<EmployOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployOrderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
