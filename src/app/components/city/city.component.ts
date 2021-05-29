import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../../services/user/user.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.less']
})
export class CityComponent implements OnInit {
  @Input('city') city: any;

  constructor() { }

  ngOnInit(): void {
  }

}
