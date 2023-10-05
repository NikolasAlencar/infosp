import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Post } from "../model/Post";

const URL = environment.api

@Injectable({
  providedIn: "root"
})
export class FeedService {

  constructor(private http: HttpClient) {}

  getPosts(){
    return this.http.get<Observable<Post[]>>(`${URL}/get-posts`)
  }

  post(formData: any){
    return this.http.post(`${URL}/postar`, formData)
  }

  addComment(post: Post){
    return this.http.post(`${URL}/add-comment`, post)
  }

  removePost(post: Post){
    return this.http.post(`${URL}/remove-post`, {idPost: post.idPost})
  }

  delComment(post: Post){
    return this.http.post(`${URL}/remove-comentario`, post)
  }
}
