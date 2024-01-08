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

export const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'favorite', component: FavoriteComponent },
      { path: 'catalog', component: CatalogComponent },
      { path: 'about', component: AboutComponent },
      { path: 'book/:id', component: BookComponent },
    ],
  },
];
