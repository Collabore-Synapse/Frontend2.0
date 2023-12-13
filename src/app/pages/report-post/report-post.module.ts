import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { ReportPostModal } from './report-post.modal';

@NgModule({
  declarations: [ReportPostModal],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [ReportPostModal]
})
export class ReportPostModalModule {}
