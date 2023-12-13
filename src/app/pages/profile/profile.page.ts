import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { IPostFeed, PostService } from 'src/app/shared/services/post.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  posts:IPostFeed[]=[]
  constructor(
    public authService: AuthService,
    private postService: PostService
  ) {}

  ngOnInit() {
    this.postService.listByLoggedUser().subscribe(res=>{
      this.posts=res
      console.log(res);
    })
  }

  profile: string = '';
  userName: String = '';


  ionViewWillEnter() {
    this.authService.findLoggedUser().subscribe((user) => {
      console.log('Usuario: ', user /*'Nome : ', user.name*/),
        (this.userName = user.name);
        this.authService.findUserPfp(user.id).subscribe(base64=>{this.profile = base64})
    });

    
  }
}
