import { Component, OnInit } from '@angular/core';
import {CityService} from '../../services/city/city.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.less']
})
export class SearchbarComponent implements OnInit {
  searchText: any;
  cities: any;

  constructor(private cityService: CityService) { }

  ngOnInit(): void {
    // subscribes to an observable
    this.cityService.getCities$().subscribe(() => {
      this.cities = this.cityService.cities$.subscribe(response => {
        this.cities = response;
        // console.log(this.cities);
      });
    });
  }

}
