import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviarParaComponent } from './enviar-para.component';

describe('EnviarParaComponent', () => {
  let component: EnviarParaComponent;
  let fixture: ComponentFixture<EnviarParaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnviarParaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnviarParaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
