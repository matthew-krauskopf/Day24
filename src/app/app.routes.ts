import { Route } from '@angular/router';
import { AuthGuard } from '@day24/auth-lib';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AmiiboListComponent } from './components/amiibo-list/amiibo-list.component';
import { AmiiboDetailComponent } from './components/amiibo-detail/amiibo-detail.component';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'amiibo',
      },
      {
        path: 'amiibo',
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: AmiiboListComponent,
          },
          {
            path: ':id',
            component: AmiiboDetailComponent,
          },
        ],
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
