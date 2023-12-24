import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { CatalogComponent } from './catalog/catalog.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },

  { path: '', component: HomeComponent },

  { path: 'profile', component: ProfileComponent },
  { path: 'favourites', component: FavouritesComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'about', component: AboutComponent },
];
