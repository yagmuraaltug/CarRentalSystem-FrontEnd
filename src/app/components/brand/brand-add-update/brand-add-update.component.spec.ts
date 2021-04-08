import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandAddUpdateComponent } from './brand-add-update.component';

describe('BrandAddUpdateComponent', () => {
  let component: BrandAddUpdateComponent;
  let fixture: ComponentFixture<BrandAddUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandAddUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandAddUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
