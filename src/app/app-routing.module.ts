import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {

    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'collabore',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'post-details',
    loadChildren: () => import('./pages/post-details/post-details.module').then( m => m.PostDetailsPageModule)
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./pages/edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
  },
  {
    path: 'password-edit',
    loadChildren: () => import('./pages/password-edit/password-edit.module').then( m => m.PasswordEditPageModule)
  },
  {
    path: 'password-forget',
    loadChildren: () => import('./pages/password-forget/password-forget.module').then( m => m.PasswordForgetPageModule)
  },
  {
    path: 'token-verification',
    loadChildren: () => import('./pages/token-verication/token-verication.module').then( m => m.TokenVericationPageModule)
  },
  {
    path: 'profile-picture',
    loadChildren: () => import('./pages/profile-picture/profile-picture.module').then( m => m.ProfilePicturePageModule)
  },
  {
    path: 'report-post',
    loadChildren: () => import('./pages/report-post/report-post.module').then( m => m.ReportPostPageModule)
  },
  {
    path: 'login-error',
    loadChildren: () => import('./pages/login-error/login-error.module').then( m => m.LoginErrorPageModule)
  },
  {
    path: 'change-name',
    loadChildren: () => import('./pages/change-name/change-name.module').then( m => m.ChangeNamePageModule)
  },



]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}