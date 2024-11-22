import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthFacade } from '@day24/auth-lib';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  authFacade: AuthFacade = inject(AuthFacade);

  ngOnInit() {
    this.authFacade.performCachedLogin();
  }
}
