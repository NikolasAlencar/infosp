import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErroGenericoComponent } from './erro-generico.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ErroGenericoComponent', () => {
  let component: ErroGenericoComponent;
  let fixture: ComponentFixture<ErroGenericoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErroGenericoComponent ],
      imports: [ RouterTestingModule ]
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
