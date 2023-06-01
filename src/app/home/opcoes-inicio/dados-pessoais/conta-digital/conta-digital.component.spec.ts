import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContaDigitalComponent } from './conta-digital.component';

describe('ContaDigitalComponent', () => {
  let component: ContaDigitalComponent;
  let fixture: ComponentFixture<ContaDigitalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContaDigitalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContaDigitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
