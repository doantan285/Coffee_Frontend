import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeteleDialogProductComponent } from './detele-dialog-product.component';

describe('DeteleDialogProductComponent', () => {
  let component: DeteleDialogProductComponent;
  let fixture: ComponentFixture<DeteleDialogProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeteleDialogProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeteleDialogProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
