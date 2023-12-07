import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Comment } from 'src/app/shared/models/post';

@Component({
  selector: 'app-modal-post-details',
  templateUrl: './modal-post-details.component.html',
  styleUrls: ['./modal-post-details.component.scss'],
})
export class ModalPostDetailsComponent  implements OnInit {

  @Input() comments: Comment[] = [];

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    console.log('comments: ', this.comments)
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onClose() {
    this.modalCtrl.dismiss({ message: 'Fechando modal' }, 'confirm');
  }

}
