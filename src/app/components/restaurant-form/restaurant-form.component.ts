import { Component, OnInit } from '@angular/core';
import {RestaurantService} from '../../services/restaurant/restaurant.service';

@Component({
  selector: 'app-restaurant-form',
  templateUrl: './restaurant-form.component.html',
  styleUrls: ['./restaurant-form.component.less']
})
export class RestaurantFormComponent implements OnInit {
  isFormVisible: boolean;
  restaurantName: string;
  restaurantAddress: string;
  restaurantCategory: string;


  constructor(private restaurantService: RestaurantService) { }

  ngOnInit(): void {
  }

  createRestaurant(): void {
    // this.restaurantService.restaurantSubject.subscribe(next => this.rest = next);
    const restaurant = JSON.stringify({name: this.restaurantName, address: this.restaurantAddress, category: this.restaurantCategory});
    this.restaurantService.createRestaurant(restaurant);
    console.log(restaurant);
  }

  toggleAddRestaurantForm(): void{
    this.isFormVisible = !this.isFormVisible;
  }

}
