import {Component, Input, OnInit} from '@angular/core';
import {RestaurantService} from '../../services/restaurant/restaurant.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.less']
})
export class RestaurantsComponent implements OnInit {
  cities: [];
  restaurants: [];
  @Input('cityName') cityName: any;

  constructor(private restaurantService: RestaurantService) { }

  ngOnInit(): void {
    this.restaurantService.getAllRestaurants$().subscribe(response => {
      this.restaurants = response;
      // console.log(this.restaurants);
    });
  }

}
