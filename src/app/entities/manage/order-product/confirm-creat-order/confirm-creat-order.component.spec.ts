import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmCreatOrderComponent } from './confirm-creat-order.component';

describe('ConfirmCreatOrderComponent', () => {
  let component: ConfirmCreatOrderComponent;
  let fixture: ComponentFixture<ConfirmCreatOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmCreatOrderComponent]
    });
    fixture = TestBed.createComponent(ConfirmCreatOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
