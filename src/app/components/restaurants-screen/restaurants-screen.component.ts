import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CityService} from '../../services/city/city.service';
import {RestaurantService} from '../../services/restaurant/restaurant.service';
import {UserService} from '../../services/user/user.service';

@Component({
  selector: 'app-restaurants-screen',
  templateUrl: './restaurants-screen.component.html',
  styleUrls: ['./restaurants-screen.component.less']
})
export class RestaurantsScreenComponent implements OnInit {
  cities: any;
  cityName: string;
  currentCity: any;
  currentUser: any;

  rest: any;
  restaurants = [];

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private cityService: CityService,
              private restaurantService: RestaurantService) { }

  // subscribe to params to get city name
  ngOnInit(): void {
    this.currentUser = this.userService.currentUser;

    this.route.params.subscribe(params => {

      this.cityName = params.name;

      // subject will emit a new city object, so we must subscribe before then
      // more on subjects and observers
      // https://stackoverflow.com/questions/45654470/have-subject-emit-a-value-when-it-is-subscribed-to
      this.cityService.citiesSubject.subscribe(response => {
        this.currentCity = response;
      });

      // emit a new city, filtered by name
      this.cityService.getCity(this.cityName);

      // get city Restaurants
      this.getCityRestaurants();
    });
  }

  getCityRestaurants(): any {
    // reset restaurants
    this.restaurants = [];
    // subscribe to restaurantSubject
    this.restaurantService.restaurantSubject.subscribe((response: any) => this.restaurants = response); // add restaurant
    // call get City Restaurants based on cityName
    this.restaurantService.getCityRestaurants(this.cityName);
  }

}
