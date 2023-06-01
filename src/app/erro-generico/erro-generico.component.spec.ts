import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErroGenericoComponent } from './erro-generico.component';

describe('ErroGenericoComponent', () => {
  let component: ErroGenericoComponent;
  let fixture: ComponentFixture<ErroGenericoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErroGenericoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErroGenericoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
