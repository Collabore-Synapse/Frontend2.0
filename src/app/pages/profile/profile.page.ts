import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  profile: String = '';
  userName: String = 'UserAPI';

  imagePaths: string[] = [
    '../../../assets/coreto.png',
    '../../../assets/paisagem1.jpg',
    '../../../assets/paisagem2.jpg',
    '../../../assets/paisagem3.jpg',
    '../../../assets/paisagem1.jpg',
    '../../../assets/paisagem3.jpg',
    '../../../assets/paisagem1.jpg',
    '../../../assets/paisagem2.jpg',
    '../../../assets/paisagem3.jpg',
    '../../../assets/paisagem4.jpeg',
    '../../../assets/coreto.png',
    '../../../assets/paisagem1.jpg',
    '../../../assets/paisagem2.jpg',
    '../../../assets/paisagem3.jpg',
    '../../../assets/paisagem1.jpg',
    '../../../assets/paisagem3.jpg',
    '../../../assets/paisagem1.jpg',
    '../../../assets/paisagem2.jpg',
    '../../../assets/paisagem3.jpg',
    '../../../assets/paisagem4.jpeg',
    '../../../assets/coreto.png',
    '../../../assets/paisagem1.jpg',
    '../../../assets/paisagem2.jpg',
    '../../../assets/paisagem3.jpg',
    '../../../assets/paisagem1.jpg',
    '../../../assets/paisagem3.jpg',
    '../../../assets/paisagem1.jpg',
    '../../../assets/paisagem2.jpg',
    '../../../assets/paisagem3.jpg',
    '../../../assets/paisagem4.jpeg',
    // para chmar a API
  ];

  openModal(imagePath: string) {
    // Implemente a lógica para abrir um modal com a imagem em imagePath
    // Você pode usar bibliotecas de modais como o ng-bootstrap ou criar um modal personalizado.
  }

}
