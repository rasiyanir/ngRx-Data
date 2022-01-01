import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit {

  post!: Post | undefined;

  id!: string;

  constructor(private route: ActivatedRoute, private postService: PostService) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    this.postService.entities$.subscribe((posts) => {
      this.post = posts.find((post) => post.id === this.id);
    });
  }

}
