import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ReportPostPage } from '../report-post/report-post.page';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
  constructor(
    private router: Router,
    private modalCtrl: ModalController,
    ) {}

  ngOnInit() {}

  posts = [
    {
      id: 1,
      imgProfile: '../../../assets/modo-serio.png',
      imgProblem: '../../../assets/coreto.png',
      type: 'Critica',
      title: 'Problema na rua',
      description: 'Rua esburacada',
      user: 'Daniel',
      city: 'Pompeia-sp',
      loved: false,
      comments: [
        {
          id: 1,
          comment: 'é verdade, eu tava lá',
        },
        {
          id: 2,
          comment: 'confia',
        },
      ],
    },
    {
      id: 2,
      imgProfile: '../../../assets/modo-serio.png',
      imgProblem: '../../../assets/paisagem1.jpg',
      title: 'Problema no poste',
      description: 'Luz queimada',
      user: 'Matheus',
      city: 'Marilia-sp',
      loved: false,
      comments: [
        {
          id: 1,
          comment: 'é verdade, eu tava lá',
        },
        {
          id: 3,
          comment: 'eu era a rua',
        },
        {
          id: 2,
          comment: 'confia',
        },
      ],
    },
    {
      id: 3,
      imgProfile: '../../../assets/modo-serio.png',
      imgProblem: '../../../assets/paisagem2.jpg',
      title: 'A praça foi limpa hoje',
      description: 'Finalmente limparam a pracinha da vila',
      user: 'Elzira',
      city: 'Marilia-sp',
      comments: [
        {
          id: 1,
          comment: 'é verdade, eu tava lá',
        },
        {
          id: 3,
          comment: 'eu era a praça',
        },
        {
          id: 2,
          comment: 'confia',
        },
      ],
    },
  ];

  comentary: string = //"";
    'Não é por nada não mas deve ter acontecido alguma coisa aí ohplaceat quia nam modi assumenda hic totam tenetur cum molestiae corporis vel inventore reprehenderit. Qui enim porro ut praesentium sapiente nam obcaecati incidunt eos repellat sint quo odio quae vel cupiditate aliquid.';
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
