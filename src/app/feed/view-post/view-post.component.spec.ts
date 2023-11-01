import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewPostComponent } from './view-post.component';
import { Post } from 'src/app/feed/model/Post';
import { FeedService } from 'src/app/feed/services/feed.service';
import { UtilService } from 'src/app/services/util.service';
import { EventEmitter } from '@angular/core';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ViewPostComponent', () => {
  let component: ViewPostComponent;
  let fixture: ComponentFixture<ViewPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewPostComponent],
      providers: [UtilService, FeedService],
      imports: [ HttpClientTestingModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit removePostEmitter event when removePost is called', () => {
    const post: any = {
      "nomeUsuario": "Nikolas Alencar",
      "imgUsuario": "1123456789",
      "tipoPost": "Transito",
      "imgPost": 8695378164,
      "titulo": "Trânsito na Marginal Pinheiros",
      "dataPost": "28/09/2023",
      "interacoes": 0,
      "comentarios": [
          {
              "nomeUsuario": "Nikolas Alencar",
              "imgUsuario": "1123456789",
              "mensagemComentario": "Nossa, acabei de passar ai e realmente está tudo parado",
              "idComentario": 1480340581
          },
          {
              "nomeUsuario": "Nikolas Alencar",
              "imgUsuario": 8699231289,
              "mensagemComentario": "TESTE COM NOVO USUARIO",
              "idComentario": 4389453357
          }
      ],
      "postAberto": false,
      "descricao": "Hoje está muito transito próximo a estação Morumbi",
      "idPost": 3291130611
    }
    spyOn(component.removePostEmitter, 'emit');
    component.removePost(post);
    expect(component.removePostEmitter.emit).toHaveBeenCalledWith(post);
  });

  it('should emit addCommentEmitter event with post and newComment when addComment is called', () => {
    const post: any = {
      "nomeUsuario": "Nikolas Alencar",
      "imgUsuario": "1123456789",
      "tipoPost": "Transito",
      "imgPost": 8695378164,
      "titulo": "Trânsito na Marginal Pinheiros",
      "dataPost": "28/09/2023",
      "interacoes": 0,
      "comentarios": [
          {
              "nomeUsuario": "Nikolas Alencar",
              "imgUsuario": "1123456789",
              "mensagemComentario": "Nossa, acabei de passar ai e realmente está tudo parado",
              "idComentario": 1480340581
          },
          {
              "nomeUsuario": "Nikolas Alencar",
              "imgUsuario": 8699231289,
              "mensagemComentario": "TESTE COM NOVO USUARIO",
              "idComentario": 4389453357
          }
      ],
      "postAberto": false,
      "descricao": "Hoje está muito transito próximo a estação Morumbi",
      "idPost": 3291130611
    }
    const newComment = 'New comment';
    spyOn(component.addCommentEmitter, 'emit');
    component.addComment(post, newComment);
    expect(component.addCommentEmitter.emit).toHaveBeenCalledWith({ post, newComment });
  });

  it('should remove a comment from the post when delComment is called', () => {
    const post: any = {
      "nomeUsuario": "Nikolas Alencar",
      "imgUsuario": "1123456789",
      "tipoPost": "Transito",
      "imgPost": 8695378164,
      "titulo": "Trânsito na Marginal Pinheiros",
      "dataPost": "28/09/2023",
      "interacoes": 0,
      "comentarios": [
      ],
      "postAberto": false,
      "descricao": "Hoje está muito transito próximo a estação Morumbi",
      "idPost": 3291130611
    }
    const delComment: any = {
      "nomeUsuario": "Nikolas Alencar",
      "imgUsuario": "1123456789",
      "tipoPost": "Transito",
      "imgPost": 8695378164,
      "titulo": "Trânsito na Marginal Pinheiros",
      "dataPost": "28/09/2023",
      "interacoes": 0,
      "comentarios": [
          {
              "nomeUsuario": "Nikolas Alencar",
              "imgUsuario": "1123456789",
              "mensagemComentario": "Nossa, acabei de passar ai e realmente está tudo parado",
              "idComentario": 1480340581
          }
      ],
      "postAberto": false,
      "descricao": "Hoje está muito transito próximo a estação Morumbi",
      "idPost": 3291130611
    }
    component.delComment(post, delComment);
    expect(post.comentarios.length).toBeLessThan(delComment.comentarios.length);
  });

  it('should return true when verificaMaior is called and indexActivePost is at the last post', () => {
    component.indexActivePost = component.posts.length - 1;
    expect(component.verificaMaior()).toBe(true);
  });

  it('should return true when verificaMenor is called and indexActivePost is at the first post', () => {
    component.indexActivePost = 0;
    expect(component.verificaMenor()).toBe(true);
  });
});
