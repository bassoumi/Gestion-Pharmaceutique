import { Component } from '@angular/core';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  currentDate: string;

  constructor(private authService: UsersService , private router : Router) {
    this.currentDate = new Date().toLocaleDateString();

  }
 
  
  logout() {
    console.log('Logout clicked');
    console.log('Current localStorage:', localStorage);
    const refreshToken = localStorage.getItem('refresh_token');
    console.log('Retrieved refresh token:', refreshToken);

    if (refreshToken) {
      console.log('Refresh token found:', refreshToken);
      this.authService.logout(refreshToken).subscribe(
        response => {
          console.log('Logout response:', response);
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          this.router.navigate(['/']);
        },
        error => {
          console.error('Logout error', error);
        }
      );
    } else {
      console.log('No refresh token found');
    }
  }
}
