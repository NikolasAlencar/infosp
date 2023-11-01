import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedComponent } from './feed.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FeedService } from './services/feed.service';
import { map } from 'rxjs';

describe('FeedComponent', () => {
  let component: FeedComponent;
  let fixture: ComponentFixture<FeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedComponent ],
      imports: [
        MatDialogModule,
        HttpClientTestingModule,
        RouterTestingModule,
        MatSnackBarModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Posts carregados com sucesso', () => {
    const service = TestBed.inject(FeedService);
    service.getPosts().pipe(
      map((response: any) => response['data'])
    )
    .subscribe(posts => {
      expect(Array.isArray(posts)).toBe(true)
    })
  })

  it('Erro na chamada', () => {
    const service = TestBed.inject(FeedService);
    service.getPosts().subscribe({error: (res) => expect(res.status).toEqual(500)})
  })
});
