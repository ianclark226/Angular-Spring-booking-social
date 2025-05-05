import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../services/services/authentication.service';
import { Router } from '@angular/router';
import { CodeInputModule } from 'angular-code-input';

@Component({
  selector: 'app-activate-account',
  standalone: true, // ← This is critical for standalone components
  imports: [CommonModule, FormsModule, CodeInputModule],
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss'] // ← typo fix: styleUrl → styleUrls
})
export class ActivateAccountComponent {

  message = '';
  isOkay = true;
  submitted = false;

  constructor(
    private router: Router,
    private authService: AuthenticationService
    ){
    }

  onCodeCompleted(token: string) {
      this.confirmAccount(token);
    }

  redirectToLogin() {
    this.router.navigate(['login'])
    }

  confirmAccount(token: string) {
    this.authService.confirm({
      token
      }).subscribe({
    next: () => {
      this.message = "you account has been successfully activation. /n Now you can proceed to login"
      this.submitted = true
      this.isOkay = true
      },
    error: () => {
      this.message = "your token has expired or invalid"
      this.submitted = true
            this.isOkay = false
      }
    })
  }

}
