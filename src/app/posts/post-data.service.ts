import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DefaultDataService, HttpUrlGenerator } from "@ngrx/data";
import { Observable } from "rxjs";
import { Post } from "../models/post.model";
import { map } from "rxjs/operators";

@Injectable()
export class PostDataService extends DefaultDataService<Post>{
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('Post', http, httpUrlGenerator);
  }

  getAll(): Observable<Post[]> {
    return this.http.get(`https://ngrx-demo-authentication-default-rtdb.firebaseio.com/posts.json`)
    .pipe(
      map((data: any) => {
      const posts: Post[] = [];
      for (let key in data){
        posts.push({...data[key], id: key});
      }
      return posts;
    }))
  }
}
