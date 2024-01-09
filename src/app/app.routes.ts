import { Routes } from '@angular/router';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { HomeComponent } from './components/pages/home/home.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { CatalogComponent } from './components/pages/catalog/catalog.component';
import { AboutComponent } from './components/pages/about/about.component';
import { LayoutComponent } from './components/layout/layout/layout.component';
import { BookComponent } from './components/pages/book/book.component';
import { FavoriteComponent } from './components/pages/favorite/favorite.component';
import { AdminRequestsComponent } from './components/pages/admin-requests/admin-requests.component';
import { AuthGuard } from './services/auth-guard.service';

export const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'catalog', component: CatalogComponent },
      { path: 'about', component: AboutComponent },
      { path: 'book/:id', component: BookComponent },

      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard],
        data: { roles: ['reader', 'librarian'] },
      },
      {
        path: 'favorite',
        component: FavoriteComponent,
        canActivate: [AuthGuard],
        data: { roles: ['reader', 'librarian'] },
      },
      {
        path: 'requests',
        component: AdminRequestsComponent,
        canActivate: [AuthGuard],
        data: { roles: ['admin'] },
      },
    ],
  },
];
