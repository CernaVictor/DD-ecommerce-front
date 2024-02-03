import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.component';
import { Address } from '../models/adress.component';
import { Router } from '@angular/router';
import { NotifierService } from '../services/notifier.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerDTO = {
    user: new User(),
    deliveryAddress: new Address(),
    billingAddress: new Address(),
  };

  constructor(
    public router: Router,
    public authService: AuthService,
    private notifierService: NotifierService
  ) {}

  ngOnInit(): void {}

  onRegister() {
    this.registerDTO.user.isAdmin = this.registerDTO.user.isAdmin || false;

    this.authService.register(this.registerDTO).subscribe({
      next: (userData) => {
        localStorage.setItem('user', JSON.stringify(userData));
        this.router.navigate(['']);
      },
      error: (error) => {
        this.notifierService.showNotification('Invalid input', 'Check fields!');
        console.log(error);
      },
    });
  }
}
