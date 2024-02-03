import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NotifierService } from '../services/notifier.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent {
  setEmailForm = new FormGroup({
    email: new FormControl('', Validators.required),
  });

  constructor(
    public router: Router,
    public authService: AuthService,
    private notifierService: NotifierService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  email!: string;

  onForgotPassword() {
    this.email = this.setEmailForm.value.email!;
    console.log(this.email);
    this.authService.forgotPassword(this.email).subscribe({
      next: () => {
        this.router.navigate(['/login']);
        this.notifierService.showNotification('Email sent', 'OK');
      },
      error: (error) => {
        this.notifierService.showNotification('Email sent', 'OK');
        console.log(error);
      },
    });
  }
}
