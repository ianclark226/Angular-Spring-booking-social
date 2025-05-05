import { Component } from '@angular/core';
import { AuthenticationRequest } from '../../services/models/authentication-request';
import { AuthenticationService } from '../../services/services/authentication.service';
import { TokenService } from '../../services/token/token.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  authRequest: AuthenticationRequest = { email: '', password: '' };
  errorMsg: Array<string> = [];

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private tokenService: TokenService
  ) {}

  login() {
       this.errorMsg = [];
       this.authService.authenticate({
         body: this.authRequest
}).subscribe({
         next: (res: any) => {
            this.tokenService.token = res.token as string;
            this.router.navigate(['books']);
         },
         error: (err: any) => {
           console.error(err);

           if (err.status === 403 || err.status === 401) {
             // Show the message from the backend
             const errorMessage = err.error?.error || err.error?.businessErrorDescription || 'Authentication failed';
             this.errorMsg.push(errorMessage);
           } else if (err.error?.validationErrors) {
             this.errorMsg = err.error.validationErrors;
           } else {
             this.errorMsg.push('An unexpected error occurred');
           }
         }
       });
     }

  register() {
    this.router.navigate(['register']);
  }
}
