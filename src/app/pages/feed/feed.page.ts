import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject, debounceTime, lastValueFrom } from 'rxjs';
import { User } from 'src/app/shared/models/auth';
import { Post } from 'src/app/shared/models/post';
import { PostsService } from 'src/app/shared/services/posts.service';
import { UserService } from 'src/app/shared/services/user.service';
import { ModalPostDetailsComponent } from './modal-post-details/modal-post-details.component';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {

  public postList$ = new BehaviorSubject<Post[]>([]);
  onLoading: boolean = false;
  public userInfo: any = {}; 


  constructor(
    private router: Router,
    private postsService: PostsService,
    private userService: UserService,
    private modalCtrl: ModalController
  ) {}

  async ngOnInit() {
    // this.postsService.getGeolocation();
    this.onLoading = true;
    this.getUserInfo();
    await this.getPostList();
  }

  async getPostList() {
    try {
      await this.postsService.getGeolocation();
      const response = await lastValueFrom(this.postsService.getPosts());
      this.postList$.next(response);
    } catch (error) {
      console.error('Erro ao obter a lista de posts:', error);
    } finally {
      this.onLoading = false;
    }
  }


  getUserInfo() {
    this.userService.getUserInfo().subscribe({
      next: (user) => {
        this.userInfo = user;
        console.info("user: ", user);
        console.log("pfp: ", this.userInfo.pfp)
      },
      error: (erro) => console.error("erro: ", erro)
    })
  }

  async openModalComments(id: number) {
    const modal = await this.modalCtrl.create({
      component: ModalPostDetailsComponent,
      componentProps: {
        comments: this.postList$.getValue().find(post => post.id === id)?.comments?.commentsData || []
      }
    })
    .then(modalEl => {
      modalEl.present();
      return modalEl.onDidDismiss();
    })
    .then(data => {
      console.log('data: ', data.data, data.role);
    })
  }


  // getPostList() {
  //   this.postsService.getPosts()
  //   // .pipe(
  //   //   debounceTime(200)
  //   // )
  //   .subscribe({
  //     next: (posts) => {
  //       console.log('Lista de posts: ', posts)
        
  //       this.postList$.next(posts);
  //       this.onLoading = false;
  //     },
  //     error: (erro) => console.error('Erro => ', erro)
  //   })
  // }

  comentary: string = //"";
    'Não é por nada não mas deve ter acontecido alguma coisa aí ohplaceat quia nam modi assumenda hic totam tenetur cum molestiae corporis vel inventore reprehenderit. Qui enim porro ut praesentium sapiente nam obcaecati incidunt eos repellat sint quo odio quae vel cupiditate aliquid.';
  limitCard: number = 85;
}
