import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PostComponent } from './post.component';
import { ReportPostModalModule } from 'src/app/pages/report-post/report-post.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [PostComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    ReportPostModalModule
  ],
  exports: [PostComponent],
})
export class PostModule { }
