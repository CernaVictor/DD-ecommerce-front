import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.component';
import { AuthService } from '../services/auth.service';
import { NotifierService } from '../services/notifier.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: User = new User();

  constructor(
    public router: Router,
    public authService: AuthService,
    private notifierService: NotifierService
  ) {}

  ngOnInit(): void {}

  onLogin() {
    this.authService.login(this.user).subscribe({
      next: (userData) => {
        localStorage.setItem('user', JSON.stringify(userData));
        this.notifierService.showNotification('Login successful', 'OK');
        this.router.navigate(['']);
      },
      error: (error) => {
        this.notifierService.showNotification(
          'Invalid username/password',
          'Try again!'
        );
        console.log(error);
      },
    });
  }
}
