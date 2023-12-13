import { Component, Input, OnInit } from '@angular/core';
import { IPostFeed, PostService } from '../services/post.service';
import { ModalController } from '@ionic/angular';
import { ReportPostModal } from 'src/app/pages/report-post/report-post.modal';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent  implements OnInit {
  @Input() public post!:IPostFeed;
  constructor(
    private modalCtrl: ModalController,
    private postService: PostService
  ) { }

  ngOnInit() {}

  limitCard: number = 85;

  toggleHeart(post: any) {
    post.loved = !post.loved;
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ReportPostModal,
      cssClass: "modal-report",
    });
    console.log("aberto ");
    await modal.present();
  }

}
