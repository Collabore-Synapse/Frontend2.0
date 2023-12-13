import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  create(post:IPostForm): Observable<IPost> {
    const formData = new FormData();
    for (const key of Object.keys(post)) {
      
    }
    formData.append("title", post.title);
    formData.append("text", post.text);
    formData.append("tags_id", ""+post.tags_id);
    formData.append("latitude", ""+post.latitude);
    formData.append("longitude", ""+post.longitude);
    formData.append("image", post.image);

    return this.http.post<IPost>(`${environment.API}/post`,formData);
  }

  list(): Observable<IPostFeed[]> {
    return this.http.get<IPostFeed[]>(`${environment.API}/post/find`);
  }

  listByUser(userId:number): Observable<IPostFeed[]> {
    return this.http.get<IPostFeed[]>(`${environment.API}/post/user/${userId}`);
  }

  listByLoggedUser(): Observable<IPostFeed[]> {
    return this.http.get<IPostFeed[]>(`${environment.API}/user/me/posts`);
  }

  findById(postId:number): Observable<IPostFeed>{
    return this.http.get<IPostFeed>(`${environment.API}/post/${postId}`);
  }
}

export interface IPost{
  user_id:number
  image_id:number
  tags_id:number
  title:string
  latitude:string
  longitude:string
  city:string
  text:string
}
export interface IPostForm{
  image:Blob
  tags_id:number
  title:string
  latitude:string
  longitude:string
  text:string
}

export interface IPostFeed {
  id: number
  user_id: number
  image_id?: number
  tags_id: number
  title: string
  latitude: number
  longitude: number
  city: string
  text: string
  created_at: string
  name: string
  pfp: string
  comments: Comments
  reactions: Reactions
  link_pfp?: string
  image?: string
}

export interface Comments {
  quantidadeComentarios: number
  commentsData: any[]
}

export interface Reactions {
  quantidadeLike: number
  reactionsData: any[]
}
