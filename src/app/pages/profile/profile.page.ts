import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  constructor(
    public authService: AuthService,
  ) {}

  ngOnInit() {}

  profile: String = '';
  userName: String = '';

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
    '../../../assets/paisagem1.jpg',
    '../../../assets/paisagem2.jpg',
    '../../../assets/paisagem3.jpg',
    '../../../assets/paisagem4.jpeg',
    // para chmar a API
  ];


  // ionViewWillEnter() {
  //   this.authService.findLoggedUser().subscribe((user) => {
  //     console.log('Usuario: ', user /*'Nome : ', user.name*/),
  //       (this.userName = user.name);
  //   });
  // }
}
