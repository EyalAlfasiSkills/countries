import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private userService: UserService,
  ) { }

  isLoggedIn: boolean = false


  ngOnInit(): void {
    this.userService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isLoggedIn = isAuthenticated
    })
  }

  onLogOut = () => {
    this.userService.logOut()
  }

}
