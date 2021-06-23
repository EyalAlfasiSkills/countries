import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user-service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'countries';

  constructor(
    private userService: UserService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.authListener()
  }

  authListener = () => {
    this.userService.isAuthenticated$.subscribe(isAuthenticated => {
      if (!isAuthenticated) {
        this.router.navigate([''])
      }
    })
  }
}
