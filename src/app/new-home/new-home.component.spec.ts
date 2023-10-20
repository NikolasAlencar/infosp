import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewHomeComponent } from './new-home.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('NewHomeComponent', () => {
  let component: NewHomeComponent;
  let fixture: ComponentFixture<NewHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewHomeComponent ],
      imports: [ RouterTestingModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
