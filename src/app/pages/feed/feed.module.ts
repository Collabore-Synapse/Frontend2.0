import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeedPageRoutingModule } from './feed-routing.module';

import { FeedPage } from './feed.page';
import { PostModule } from 'src/app/shared/post/post.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostModule,
    FeedPageRoutingModule
  ],
  declarations: [FeedPage]
})
export class FeedPageModule {}
