import { Component } from '@angular/core';
import { HeaderComponent } from '../../UI/header/header.component';
import { FooterComponent } from '../../UI/footer/footer.component';
import { AuthService } from '../../../services/auth.service';
import { LayoutComponent } from '../../layout/layout/layout.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, LayoutComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  constructor(private authService: AuthService) {}

  logout() {
    console.log('log');
    this.authService.logout();
  }
}
