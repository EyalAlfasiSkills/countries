import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage-service/storage.service';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  private correctEmail: string = 'testemail@stambdika.com'

  email: string = ''
  errorMsg: string = ''
  errorTimeoutId: ReturnType<typeof setTimeout> | null = null

  ngOnInit(): void {

  }

  onSubmit = (ev: any): void => {
    ev.preventDefault()
    this.validateEmail()
  }

  validateEmail = () => {
    const { email } = this
    if (email === this.correctEmail) {
      this.userService.logIn(email)
      this.router.navigate(['/countries']);
      return
    }
    else if (!email) {
      this.displayError('Please enter email address')
      return
    } else {
      this.displayError('Incorrect email address, try again')
      return
    }
  }

  displayError = (errorMsg: string): void => {
    this.errorMsg = errorMsg
    if (this.errorTimeoutId) {
      clearTimeout(this.errorTimeoutId)
    }
    this.errorTimeoutId = setTimeout(() => {
      this.errorMsg = ''
    }, 3000);
  }



}
