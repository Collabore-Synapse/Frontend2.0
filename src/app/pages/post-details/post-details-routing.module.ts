import { Injectable, NgModule } from '@angular/core';
import { Routes, RouterModule, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { PostDetailsPage } from './post-details.page';
import { IPostFeed, PostService } from 'src/app/shared/services/post.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/auth';

@Injectable({ providedIn: 'root' })
export class PostResolver implements Resolve<IPostFeed> {

  constructor(private postService: PostService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IPostFeed> {
    const id = route.paramMap.get('id');
    return this.postService.findById(Number(id));
  }
}

const routes: Routes = [
  {
    path: ':id',
    component: PostDetailsPage,
    resolve:{
      post:PostResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostDetailsPageRoutingModule {}
