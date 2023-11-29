import { ImageUploadComponent } from './image-upload.component';
import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Injectable({providedIn: 'root'})	
export class ImageUploadService {

  constructor( private modalCtrl: ModalController) {  }
  public async upload(blob:Blob){
    const modal = await this.modalCtrl.create({
      component:ImageUploadComponent,
      componentProps:{imageBlob:blob},
      cssClass: "modal-picture"
    })
    await modal.present();
    console.log(modal.component)
    return modal.onDidDismiss()
  }
}
