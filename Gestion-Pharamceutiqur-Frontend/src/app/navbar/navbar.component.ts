import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isSidebarOpen = false; // Assurez-vous que la barre latérale est fermée au départ
  currentTime: string = '';
  private timerId: any;

  constructor(public authService: UsersService, private router: Router) {}

  ngOnInit() {
    this.authService.checkAuthenticated().subscribe();
    this.updateTime();
    this.timerId = setInterval(() => this.updateTime(), 60000);
    this.resetSidebarState(); 
  }

  ngOnDestroy() {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }

  private updateTime(): void {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    this.currentTime = `${hours}:${minutes}`;
  }

  logout() {
    console.log('Logout clicked');
    const refreshToken = localStorage.getItem('refresh_token');

    if (refreshToken) {
      this.authService.logout(refreshToken).subscribe(
        response => {
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

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.updateSidebarState();
  }

  private resetSidebarState() {
    this.isSidebarOpen = false;
    this.updateSidebarState();
  }

  private updateSidebarState() {
    const navBar = document.getElementById('nav-bar');
    const mainContent = document.querySelector('.main-content');

    if (this.isSidebarOpen) {
      navBar?.classList.remove('closed');
      if (mainContent) {
        mainContent.classList.remove('closed');
      }
    } else {
      navBar?.classList.add('closed');
      if (mainContent) {
        mainContent.classList.add('closed');
      }
    }
  }
}
