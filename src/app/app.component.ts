import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { LoaderService } from './shared/services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public _auth: AuthService, public _loader: LoaderService) {
    this._auth.setUserFromLocal();
  }
}
