import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NotifierService } from '../services/notifier.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ResetPassword } from '../models/resetPassword.component';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrl: './set-password.component.css',
})
export class SetPasswordComponent {
  setPasswordForm = new FormGroup({
    newPassword: new FormControl('', Validators.required),
  });

  resetPassword = new ResetPassword();

  constructor(
    public router: Router,
    public authService: AuthService,
    private notifierService: NotifierService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((value) => {
      this.resetPassword.token = value['token'];
      this.resetPassword.newPassword = this.setPasswordForm.value.newPassword;
    });
  }

  onSetPassword() {
    this.authService
      .resetPassword(
        this.resetPassword.token!,
        this.setPasswordForm.value.newPassword!
      )
      .subscribe({
        next: () => {
          this.notifierService.showNotification('Password changed!', 'OK');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.notifierService.showNotification(
            'Something went wrong',
            'Try again!'
          );
          console.log(error);
        },
      });
  }
}
