import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ReportPostModal } from '../report-post/report-post.modal';
import { IPostFeed, PostService } from 'src/app/shared/services/post.service';
import { tap } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
  posts: IPostFeed[] = [];
  constructor(
    private router: Router,
    private modalCtrl: ModalController,
    private postService: PostService,
    private auth:AuthService
  ) {}

  ngOnInit() {
    this.fetchPosts().subscribe();
      
  }

  private fetchPosts() {
    return this.postService
      .list()
      .pipe(tap((res) => {
        this.posts = res;
      }));
  }

  handleRefresh(event: any) {
    this.fetchPosts().subscribe({complete:()=>{
      event.target.complete();
    }})
  }

  limitCard: number = 85;

  toggleHeart(post: any) {
    post.loved = !post.loved;
  }

  fazerLogout() {
    this.auth.signOut()
    this.router.navigate(['/'],{replaceUrl:true});
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ReportPostModal,
      cssClass: 'modal-report',
    });
    console.log('aberto ');
    await modal.present();
  }
}
