import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareManageComponent } from './share-manage.component';

describe('ShareManageComponent', () => {
  let component: ShareManageComponent;
  let fixture: ComponentFixture<ShareManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShareManageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShareManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
