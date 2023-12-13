import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-report-post',
  templateUrl: './report-post.modal.html',
  styleUrls: ['./report-post.modal.scss'],
})
export class ReportPostModal implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

}
