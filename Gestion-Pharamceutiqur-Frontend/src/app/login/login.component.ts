import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;
  constructor(
    private fb: FormBuilder,
    private authService: UsersService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: [''],
      password: ['']
    });
  }



  onSubmit(): void {
    const { username, password } = this.loginForm.value;
    localStorage.setItem('username', username);
  
    this.authService.login(username, password).subscribe(
      response => {
        console.log('Login response:', response);
        localStorage.setItem('access_token', response.access);
        localStorage.setItem('refresh_token', response.refresh);
        this.router.navigate(['/home']);
      },
      error => {
        console.error('Login failed', error);
  
        if (error.error && error.error.error) {
          this.errorMessage = error.error.error; 
        } else {
          this.errorMessage = 'Erreur lors de la connexion. Veuillez vérifier votre mot de passe ou nom d\'utilisateur.';
        }
      }
    );
  }
  
}
