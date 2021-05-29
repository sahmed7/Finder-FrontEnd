import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject, Subject} from 'rxjs';
import {HttpService} from '../http/http.service';
import {CityService} from '../city/city.service';

@Injectable({
  providedIn: 'root'
})
export class MenuItemService {
  apiUrl = 'https://glacial-reef-44046.herokuapp.com/api/cities/';
  menuItems$: any;
  errorText: string;
  navSubject = new Subject();
  errorSubject = new Subject();
  menuItemsSubject = new Subject();
  menuItemModSubject = new BehaviorSubject<boolean>(false);
  menuItemId: number;
  restaurantId: any;
  isEditing = this.menuItemModSubject.asObservable();
  city: any;

  constructor(private http: HttpClient, private httpService: HttpService, private router: Router, private cityService: CityService) { }

  // tslint:disable-next-line:typedef
  menuItemEditing(editAction: boolean) {
    this.menuItemModSubject.next(editAction);
  }
  addMenuItem(newItem): any {
    console.log(newItem);
    const headers = this.httpService.getAuthentication();
    return this.http
      .post(this.apiUrl + this.city[0].id + '/restaurants/' + this.restaurantId + '/menu', newItem, headers);
  }

  updateMenuItem(updatedItem): any {
    console.log(updatedItem);
    const headers = this.httpService.getAuthentication();
    return this.http
      .put(this.apiUrl + this.city[0].id + '/restaurants/' + this.restaurantId + '/menu/' + this.menuItemId, updatedItem, headers);
  }
  deleteMenuItem(): any {
    const headers = this.httpService.getAuthentication();
    return this.http
      .delete(this.apiUrl + this.city[0].id + '/restaurants/' + this.restaurantId + '/menu/' + this.menuItemId, headers);
  }

  getMenuItems$(restaurantId): any {
    // get JWT token from localStorage
    const headers = this.httpService.getAuthentication();
    this.city = this.cityService.currentCity;
    this.restaurantId = restaurantId;
    return this.menuItems$ = this.http.get(this.apiUrl + this.city[0].id + '/restaurants/' + restaurantId + '/menu/', headers);

  }

  getSingleMenuItem(menuItemId): any {
    this.getMenuItems$(this.restaurantId).subscribe(response => {
      this.menuItemId = menuItemId;
      // tslint:disable-next-line:triple-equals
      return this.menuItemsSubject.next(response.filter(item => item.id == menuItemId));
    });
  }
  getAuthErrorText(statusCode: any): string{
    console.log('STATUS: ' + statusCode);

    switch (statusCode){
      case 409:
        this.errorSubject.next('Menu Item already exists!');
        break;
      // case 403:
      //   this.errorSubject.next('Incorrect Password!!');
      //   break;
      // case 404:
      //   this.errorSubject.next('User with that email does not exist!!');
      //   break;
      default:
        console.log(statusCode);
        return 'You dun messed up now!';
    }
  }
}
