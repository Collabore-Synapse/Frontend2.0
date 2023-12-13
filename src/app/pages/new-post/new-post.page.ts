import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraResultType } from '@capacitor/camera';
import { IonTextarea, ModalController } from '@ionic/angular';
import { LocationModal } from '../location/location.page';
import { HttpClient } from '@angular/common/http';
import { IPostForm, PostService } from 'src/app/shared/services/post.service';
enum PostSegments {
  ELOGIO = 1,
  ALERTA = 2,
  CRITICA = 3,
}
@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.page.html',
  styleUrls: ['./new-post.page.scss'],
})
export class NewPostPage implements AfterViewInit {
  imageUrl: string = '';
  postForm!: FormGroup;
  segments = PostSegments;
  @ViewChild('descriptionField') descriptionField?: IonTextarea;

  constructor(
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private postService: PostService
  ) {}
  ngAfterViewInit(): void {
    this.postForm.get(`segment`)?.setValue(PostSegments.ELOGIO);
  }

  ngOnInit() {
    this.postForm = this.formBuilder.group({
      image: ['', Validators.required],
      tags_id: ['', Validators.required],
      title: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      text: ['', Validators.required],
    });

    this.postForm
      .get(`segment`)
      ?.valueChanges.subscribe((segment) => this.segmentChanged(segment));
  }

  segmentChanged(segment: PostSegments) {
    switch (segment) {
      case PostSegments.ELOGIO:
        this.descriptionField!.placeholder = 'Conte aqui o seu elogio...';
        break;
      case PostSegments.ALERTA:
        this.descriptionField!.placeholder = 'Diga-nos qual o seu alerta...';
        break;
      case PostSegments.CRITICA:
        this.descriptionField!.placeholder = 'Faça aqui sua reclamação...';
        break;
    }
  }

  async getLocation() {
    const modal = await this.modalCtrl.create({
      component: LocationModal,
    });
    await modal.present();
    const { data, role } = await modal.onDidDismiss();
    if (role == `submit`) {
      const { lat: latitude, lng: longitude } = data as L.LatLng;

      this.postForm.get(`latitude`)?.setValue(latitude);
      this.postForm.get(`longitude`)?.setValue(longitude);
    }
    console.log(this.postForm.value);
  }

  //---------------------------------------------------------------------------------------
  
  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Base64,
    });

    var imageUrl = 'data:image/jpeg;base64,' + image.base64String;

    const blob = await fetch(imageUrl).then(result => result.blob())

    // Can be set to the src of an image now
    this.imageUrl=imageUrl
    this.postForm.get(`image`)?.setValue(blob);
  };

  //---------------------------------------------------------------------------------------------

  onSubmit() {
    if (this.postForm.valid) {

      const post = this.postForm.value as IPostForm;
      
      this.postService.create(post).subscribe({
        next: (res) => {
          window.history.back();
        },
        error: (res) => {console.error(res)},
        complete: () => {},
      });
      // Faça algo com os dados do formulário, por exemplo, envie para um serviço
      console.log('Formulário válido. Dados do usuário:', this.postForm.value);
    } else {
      console.log(
        'Formulário inválido. Por favor, corrija os campos destacados.'
      );
    }
  }
}
