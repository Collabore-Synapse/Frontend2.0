import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportPostPageRoutingModule } from './report-post-routing.module';

import { ReportPostPage } from './report-post.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportPostPageRoutingModule
  ],
  declarations: [ReportPostPage]
})
export class ReportPostPageModule {}
