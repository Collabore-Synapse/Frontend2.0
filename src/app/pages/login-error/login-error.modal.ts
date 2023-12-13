import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-login-error',
  templateUrl: './login-error.modal.html',
  styleUrls: ['./login-error.modal.scss'],
})
export class LoginErrorModal implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

}
