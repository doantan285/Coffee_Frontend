import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPaidComponent } from './edit-paid.component';

describe('EditPaidComponent', () => {
  let component: EditPaidComponent;
  let fixture: ComponentFixture<EditPaidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPaidComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditPaidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
