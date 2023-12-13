import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPostFeed, PostService } from 'src/app/shared/services/post.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.page.html',
  styleUrls: ['./post-details.page.scss'],
})
export class PostDetailsPage implements OnInit {
  public post!:IPostFeed;
  console(){
    console.log(this.post);
  }
  constructor(
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.data.subscribe(({ post }) => {
      console.log(post);
    });
  }
  
}
