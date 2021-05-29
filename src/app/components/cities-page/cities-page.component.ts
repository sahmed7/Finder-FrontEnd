import { Component, OnInit } from '@angular/core';
import {CityService} from '../../services/city/city.service';
import {UserService} from '../../services/user/user.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities-page.component.html',
  styleUrls: ['./cities-page.component.less']
})
export class CitiesPageComponent implements OnInit {
  cities: any;
  currentUser: any;
  isFormVisible: boolean;

  name: string;

  constructor(private cityService: CityService, private userService: UserService) { }

  ngOnInit(): void {
    this.cityService.getCities$().subscribe(response => this.cities = response);
    this.currentUser = this.userService.currentUser;
  }

  toggleAddCityForm(): void{
    this.isFormVisible = !this.isFormVisible;
  }

  // create new city based on form input
  createCity(): void {
    // expected fields for POST "/api/cities":
    //    name
    const cityObject = JSON.stringify({ name: this.name });
    this.cityService.createCity(cityObject);
    this.cityService.citiesSubject.subscribe(response => {
      this.cities = [...this.cities, response];
    });
  }

}
