import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginErrorPageRoutingModule } from './login-error-routing.module';

import { LoginErrorPage } from './login-error.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginErrorPageRoutingModule
  ],
  declarations: [LoginErrorPage]
})
export class LoginErrorPageModule {}
