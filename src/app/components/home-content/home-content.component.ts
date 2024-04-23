import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { SigninbuttonComponent } from 'src/app/components/signinbutton/signinbutton.component';


@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.css'],
  standalone: true,
  imports: [
    FontAwesomeModule,
    SigninbuttonComponent,
  ]
})
export class HomeContentComponent {
  faLink = faLink;
}
