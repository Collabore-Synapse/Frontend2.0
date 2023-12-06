import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProfilePicturePage } from '../profile-picture/profile-picture.page';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/models/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChangeNamePage } from '../change-name/change-name.page';
import { LocationModal } from '../location/location.page';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage{
  public userForm = new FormGroup({
    name:new FormControl(``,[Validators.required])
  })
  constructor(
    private modalCtrl: ModalController,
    public authService: AuthService,
    private http: HttpClient) { }

  ionViewWillEnter() {
    this.authService.findLoggedUser()
      .subscribe((user) => {
        console.log('Usuario: ', user, /*'Nome : ', user.name*/), ( this.userForm.controls.name.patchValue(user.name));
        this.authService.findUserPfp(user.id).subscribe(base64=>{this.profile = base64})
      });
  }

  profile: string = '';
  userName: string = 'UserAPI';

  

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ProfilePicturePage,
      cssClass: "modal-picture",
    });
    console.log("aberto ");
    await modal.present();
  }

  async openModalSuccess() {
    const modal = await this.modalCtrl.create({
      component: ChangeNamePage,
      cssClass: "modal-name",
    });
    console.log("aberto ");
    await modal.present();
  }

  async save(){
    const {name} =this.userForm.value
    if(!name){
      throw new Error("nome não informado");
    }
    this.setName(name);
  }

  //TODO: precisa mostrar para o usuario que está carregando:

  async setName(newName:string){
    this.http.patch(`${environment.API}/user/setName`,{newName}).subscribe(
      ()=>{
        this.openModalSuccess();
      }
    )
  }

}
