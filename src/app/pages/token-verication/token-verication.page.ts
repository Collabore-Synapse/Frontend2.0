import { AuthService } from 'src/app/shared/services/auth.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-token-verication',
  templateUrl: './token-verication.page.html',
  styleUrls: ['./token-verication.page.scss'],
})
export class TokenVericationPage implements OnInit {

  constructor(private authService: AuthService) { }

  token: string = "";

  ngOnInit() {
  }

  tokenVerification(){
    this.authService.verifyToken({tokenCode: this.token}, this.authService.returnToken());
  };

}
