import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ReportPostPage } from '../report-post/report-post.page';
import { IPostFeed, PostService } from 'src/app/shared/services/post.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
  posts:IPostFeed[]=[]
  constructor(
    private router: Router,
    private modalCtrl: ModalController,
    private postService: PostService
    ) {}

    

  ngOnInit() {
    this.postService.list().subscribe(res=>{
      this.posts=res
      console.log(res);
    })
  }

  
  limitCard: number = 85;

  toggleHeart(post: any) {
    post.loved = !post.loved;
  }

  fazerLogout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ReportPostPage,
      cssClass: "modal-report",
    });
    console.log("aberto ");
    await modal.present();
  }
}
