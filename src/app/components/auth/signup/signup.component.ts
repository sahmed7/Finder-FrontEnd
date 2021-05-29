import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less']
})
export class SignupComponent implements OnInit {
  public emailAddress: string;
  public userName: string;
  public password: string;
  errorText = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.errorSubject.subscribe((error: string) => this.errorText = error);
  }

  registerUser(): void{
    const newUser = {emailAddress: this.emailAddress, userName: this.userName, password: this.password};
    this.userService.registerUser(newUser);
  }

}
