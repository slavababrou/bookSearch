import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const isLoggedIn = this.authService.isLoggedIn();
    const role = this.authService.getRole();

    if (isLoggedIn && role) {
      if (next.data['roles'].includes(role)) return true;
      else {
        alert('У вашей роли нет доступа к этой странице!');
        this.router.navigate(['/']);
        return false;
      }
    } else {
      alert('Для доступа к данной страницы требуется авторизоваться!');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
