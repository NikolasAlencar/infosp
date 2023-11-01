import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { PostComponent } from './post.component';
import { FeedService } from 'src/app/feed/services/feed.service';
import { GerenciaEstadoService } from 'src/app/services/gerencia-estado.service';
import { UtilService } from 'src/app/services/util.service';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let feedServiceSpy: jasmine.SpyObj<FeedService>;
  let gerenciaEstadoServiceSpy: jasmine.SpyObj<GerenciaEstadoService>;
  let utilServiceSpy: jasmine.SpyObj<UtilService>;

  beforeEach(() => {
    const dialogSpyObj = jasmine.createSpyObj('MatDialog', ['open']);
    const feedServiceSpyObj = jasmine.createSpyObj('FeedService', ['addComment', 'delComment', 'removePost']);
    const gerenciaEstadoServiceSpyObj = jasmine.createSpyObj('GerenciaEstadoService', ['userData$']);
    const utilServiceSpyObj = jasmine.createSpyObj('UtilService', ['']);

    TestBed.configureTestingModule({
      declarations: [PostComponent],
      providers: [
        { provide: MatDialog, useValue: dialogSpyObj },
        { provide: FeedService, useValue: feedServiceSpyObj },
        { provide: GerenciaEstadoService, useValue: gerenciaEstadoServiceSpyObj },
        { provide: UtilService, useValue: utilServiceSpyObj },
      ],
    });

    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;

    dialogSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    feedServiceSpy = TestBed.inject(FeedService) as jasmine.SpyObj<FeedService>;
    gerenciaEstadoServiceSpy = TestBed.inject(GerenciaEstadoService) as jasmine.SpyObj<GerenciaEstadoService>;
    utilServiceSpy = TestBed.inject(UtilService) as jasmine.SpyObj<UtilService>;

    feedServiceSpy.addComment.and.returnValue(of({}));
    feedServiceSpy.delComment.and.returnValue(of({}));
    feedServiceSpy.removePost.and.returnValue(of({}));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete comment', fakeAsync(() => {
    const post = { idPost: 1, comentarios: [{ idComentario: 1 }] };
    component.delComment(post as any, { idComentario: 1 });
    tick();
    expect(feedServiceSpy.delComment).toHaveBeenCalled();
    expect(post.comentarios.length).toBe(0);
  }));

  it('should remove post', fakeAsync(() => {
    const post = { idPost: 1 } as any;
    component.removePost(post);
    tick();
    expect(feedServiceSpy.removePost).toHaveBeenCalled();
  }));

  it('should handle options', () => {
    component.cachePosts = [{ idPost: 1, postAberto: false }] as any;
    component.handleOptions(0);
    expect(component.cachePosts[0].postAberto).toBe(true);
  });
});
