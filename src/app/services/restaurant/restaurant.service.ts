import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {HttpService} from '../http/http.service';
import {Subject} from 'rxjs';
import {CityService} from '../city/city.service';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  apiUrl = 'https://glacial-reef-44046.herokuapp.com/api/cities/';
  restaurants$: any;
  restaurantSubject = new Subject();
  cityName: string;
  city: any;
  currentRestaurant: any;

  constructor(private http: HttpClient, private httpService: HttpService, private cityService: CityService) { }

  getAllRestaurants$(): any {
    // get JWT token from localStorage, create headers object
    const headers = this.httpService.getAuthentication();
    return this.restaurants$ = this.http.get(this.apiUrl, headers);
  }

  getCityRestaurants(cityName: string): any {

    // subscribe to city subject here
    this.cityService.citiesSubject.subscribe(response => {
      this.city = response; // think I can pipe or map this to flatten it to a single object
      // as opposed to referencing it as city[0]
      const headers = this.httpService.getAuthentication();
      this.http.get(this.apiUrl + this.city[0].id + '/restaurants', headers).subscribe(next => {
        return this.restaurantSubject.next(next); // emit restaurants based on city
      });
    });

    // emit a new city here
    this.cityService.getCity(cityName);

  }

  createRestaurant(restaurantObject): any {
    const headers = this.httpService.getAuthentication();
    this.http.post(this.apiUrl + this.city[0].id + '/restaurants', restaurantObject, headers).subscribe(response => {
      this.restaurantSubject.next(response);
    });
  }
}
