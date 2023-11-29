import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageUploadComponent } from './image-upload.component';
import { ImageUploadService } from './image-upload.service';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [ImageUploadComponent],
  imports: [
    CommonModule,
    IonicModule,
    HttpClientModule
  ],
  providers:[
    ImageUploadService
  ],
  exports: [ImageUploadComponent]
})
export class ImageUploadModule { }
