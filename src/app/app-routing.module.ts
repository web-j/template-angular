import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './security/helpers/auth.guard';
import { AdminLayoutComponent } from './component/layout/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './component/layout/auth-layout/auth-layout.component';
import { NotfoundLayoutComponent } from './component/layout/notfound-layout/notfound-layout.component';
import { Rule } from './security/model/user.model';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./dashboard/dashboard.module').then(mod => mod.DashboardModule),
        data: { roles: [Rule.Admin] }
      },

      {
        path: 'user',
        loadChildren: () => import('./view/user/user.module').then(mod => mod.UserModule),
        data: { roles: [Rule.Admin] }
      }
    ]
  },

  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        loadChildren: () => import('./security/security.module').then(mod => mod.SecurityModule)
      }
    ]
  },

  {
    path: '**',
    component: NotfoundLayoutComponent
  },

  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, onSameUrlNavigation: 'reload', enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
