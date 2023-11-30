import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportPostPage } from './report-post.page';

const routes: Routes = [
  {
    path: '',
    component: ReportPostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportPostPageRoutingModule {}
