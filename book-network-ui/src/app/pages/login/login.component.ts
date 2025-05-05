import { Component } from '@angular/core';
import { AuthenticationRequest } from '../../services/models/authentication-request';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
    standalone: true, // ✅ Make it standalone
    imports: [CommonModule, FormsModule], // ✅ Add FormsModule here
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  authRequest: AuthenticationRequest = {email: '', password: ''};
  errorMsg: Array<string> = [];

  login() {
    }

  register() {
    }

}
