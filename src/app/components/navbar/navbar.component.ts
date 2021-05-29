import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit {
  currentUser: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.navSubject.subscribe(currentUser => {
      this.currentUser = currentUser;
    });
  }

  logout(): void {
    this.userService.logoutUser();
  }

}
