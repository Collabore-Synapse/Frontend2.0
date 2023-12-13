import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginErrorModal } from './login-error.modal';

@NgModule({
  declarations: [LoginErrorModal],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [LoginErrorModal]
})
export class LoginErrorModalModule {}
