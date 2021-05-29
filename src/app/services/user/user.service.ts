import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';

const herokuUrl = 'https://glacial-reef-44046.herokuapp.com';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser: any;
  errorText: string;
  navSubject = new Subject();
  errorSubject = new Subject();

  constructor(private http: HttpClient, private router: Router) { }

  registerUser(newUser): void {
    this.http
      .post(`${herokuUrl}/auth/users/register`, newUser)
      .subscribe(response => {
        this.router.navigate(['']);
      }, err => this.getAuthErrorText(err['status'])
    );
  }

  loginUser(user): void {
    // console.log(user);
    this.http.post(`${herokuUrl}/auth/users/login`, user)
      .subscribe(response => {
        const token = response['jwt'];
        localStorage.setItem('currentUser', user);
        localStorage.setItem('token', `${token}`);
        this.router.navigate(['']);
        this.currentUser = user.emailAddress;
        this.navSubject.next(this.currentUser);
      }, err => this.getAuthErrorText(err['status'])
    );
  }

  logoutUser(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUser = null;
    this.navSubject.next(this.currentUser);
    this.router.navigate(['/login']);
  }

  getAuthErrorText(statusCode: any): string{
    console.log('STATUS: ' + statusCode);

    switch (statusCode){
      case 409:
        this.errorSubject.next('User already exists!');
        break;
      case 403:
        this.errorSubject.next('Incorrect Password!!');
        break;
      case 404:
        this.errorSubject.next('User with that email does not exist!!');
        break;
      default:
        console.log(statusCode);
        return 'You dun messed up now!';
    }
  }
}
