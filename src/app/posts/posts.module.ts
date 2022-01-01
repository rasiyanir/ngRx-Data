import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { EntityDataService, EntityDefinitionService, EntityMetadataMap } from "@ngrx/data";
import { Post } from "../models/post.model";
import { AddPostComponent } from "./add-post/add-post.component";
import { EditPostComponent } from "./edit-post/edit-post.component";
import { PostDataService } from "./post-data.service";
import { PostsListComponent } from "./posts-list/posts-list.component";
import { PostResolver } from "./posts.resolver";
import { SinglePostComponent } from "./single-post/single-post.component";

const routes: Routes = [
  { path: '', component: PostsListComponent, resolve: {posts: PostResolver}},
  { path: 'add', component: AddPostComponent},
  { path: 'edit/:id', component: EditPostComponent, resolve: {posts: PostResolver}},
  { path: 'details/:id', component: SinglePostComponent, resolve: {posts: PostResolver}},
];

const entityMetaData: EntityMetadataMap = {
  Post: {
    // entityName:
    // selectId:
    sortComparer: sortByName,
    entityDispatcherOptions: {
      //Adding this which prevents it to wait for get data from backend and updates directly as its in front end
      optimisticUpdate: true,
      //If we keep this false you will observe that it waits until it is deleted from backend
      //But keeping it true deletes it right away and do not wait
      optimisticDelete: true,
      // we should not use this as we know the id gets generated form backend and cannot depend on front end hence should not use it.
      // optimisticAdd: true,
    }
  },
}

function sortByName(a: Post, b: Post): number{
  return a.title.localeCompare(b.title);
}

@NgModule({
  declarations:[
    PostsListComponent,
    SinglePostComponent,
    EditPostComponent,
    AddPostComponent,],
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)],
  providers: [PostDataService, PostResolver],
})
export class PostsModule {
  constructor(eds: EntityDefinitionService, entityDataService: EntityDataService, PostsDataService: PostDataService){
    eds.registerMetadataMap(entityMetaData);
    entityDataService.registerService('Post', PostsDataService);
  }
}
