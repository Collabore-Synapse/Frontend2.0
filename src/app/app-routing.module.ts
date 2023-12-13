import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoggedGuard } from './guards/logged.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canActivate:[LoggedGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    canActivate:[LoggedGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule),
    canActivate:[LoggedGuard]
  },
  {
    path: 'password-forget',
    loadChildren: () => import('./pages/password-forget/password-forget.module').then( m => m.PasswordForgetPageModule),
    canActivate:[LoggedGuard]
  },
  {
    path: 'token-verification',
    loadChildren: () => import('./pages/token-verication/token-verication.module').then( m => m.TokenVericationPageModule),
    canActivate:[LoggedGuard]
  },
  {
    path: 'collabore',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'post-details',
    loadChildren: () => import('./pages/post-details/post-details.module').then( m => m.PostDetailsPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./pages/edit-profile/edit-profile.module').then( m => m.EditProfilePageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'password-edit',
    loadChildren: () => import('./pages/password-edit/password-edit.module').then( m => m.PasswordEditPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'profile-picture',
    loadChildren: () => import('./pages/profile-picture/profile-picture.module').then( m => m.ProfilePicturePageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'change-name',
    loadChildren: () => import('./pages/change-name/change-name.module').then( m => m.ChangeNamePageModule),
    canActivate:[AuthGuard]
  },
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}