import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  public classRef = NavbarComponent;

  constructor(public router: Router, public authService: AuthService) {}

  static user: {
    email: string;
    isAdmin: boolean;
    firstName: string;
    lastName: string;
  };

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') as string);
    NavbarComponent.user = user as any;
  }

  onLogout() {
    this.authService.logout();
  }
}
