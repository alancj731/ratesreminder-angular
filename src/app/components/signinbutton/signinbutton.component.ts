import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-signinbutton',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './signinbutton.component.html',
  styleUrl: './signinbutton.component.css',
})
export class SigninbuttonComponent {
  constructor(
    public auth: AuthService,
    @Inject(DOCUMENT) private doc: Document
  ) {}

  loginWithRedirect() {
    this.auth.loginWithRedirect();
  }
}
