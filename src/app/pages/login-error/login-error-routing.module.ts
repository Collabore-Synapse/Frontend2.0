import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginErrorPage } from './login-error.page';

const routes: Routes = [
  {
    path: '',
    component: LoginErrorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginErrorPageRoutingModule {}
