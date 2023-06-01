import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrivoComponent } from './crivo.component';

describe('CrivoComponent', () => {
  let component: CrivoComponent;
  let fixture: ComponentFixture<CrivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
