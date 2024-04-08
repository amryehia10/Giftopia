import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  template: ``,
  styles: ``,
})
export class LogoutComponent {
  constructor(authServise: AuthService, router: Router) {
    authServise.logout();
    router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }
}
