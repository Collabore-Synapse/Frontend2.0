import { ImageUploadService } from './../../shared/image-upload/image-upload.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Capacitor } from '@capacitor/core'; 
import { LoadingController, ModalController } from '@ionic/angular';
import { ImageCropperComponent, } from 'ngx-image-cropper';
import { DomSanitizer } from '@angular/platform-browser';
import { Camera, CameraResultType } from '@capacitor/camera';
import 'hammerjs';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-profile-picture',
  templateUrl: './profile-picture.page.html',
  styleUrls: ['./profile-picture.page.scss'],
})
export class ProfilePicturePage implements OnInit {
  imageChangedEvent: any = '';
  croppedImage: any = '';
  myImage: any = null;
  isMobile = Capacitor.getPlatform() !== 'web';
  @ViewChild("successDialog") successDialog?:ElementRef<HTMLDialogElement>
  @ViewChild("errorDialog") errorDialog?:ElementRef<HTMLDialogElement>
  @ViewChild(ImageCropperComponent) imageCropper?: ImageCropperComponent;


  constructor(
    private modalCtrl: ModalController,
    private loadContr: LoadingController,
    public fb: FormBuilder,
    public imageUploadService:ImageUploadService
  ) {}

  ngOnInit() {
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Base64,
    });
  
    const loading = await this.loadContr.create();
    await loading.present();

    this.myImage = `data:image/jpeg;base64,${image.base64String}`;
    this.croppedImage = null;
  };
  
  imageLoaded() {
    this.loadContr.dismiss();
  }

  loadImageFailed() {
    console.log('Image load failed!');
  }

  async stopCrop(){
    const loading = await this.loadContr.create();
    await loading.present();

    const crop = await this.imageCropper?.crop(`blob`)
    loading.dismiss()

    if(!crop){
      throw new Error("falha ao cortar imagem");
    }
    if(!crop.blob){
      throw new Error("falha ao reter formato da imagem");
    }
    const imageBlob:Blob = crop.blob

    await this.imageUploadService.upload(imageBlob)
    this.dismiss()

  }



  
}



/**/
