import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Subject} from 'rxjs';
import {HttpService} from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  apiUrl = 'https://glacial-reef-44046.herokuapp.com/api/cities';
  cities$: any;
  citiesSubject = new Subject();
  currentCity: any;

  constructor(private http: HttpClient, private httpService: HttpService) { }

  // returns an observable
  getCities$(): any{
    // set headers using http service
    const headers = this.httpService.getAuthentication();
    return this.cities$ = this.http.get(this.apiUrl, headers);
  }

  // emit a new city filtered by name
  // must be subscribed before then
  getCity(name: string): any {
    this.getCities$().subscribe(response => {
      this.currentCity = response.filter(item => item.name === name);
      return this.citiesSubject.next(response.filter(item => item.name === name)); // then is now
    });
  }

  // post a city object to the api
  createCity(cityObject): any {
    const headers = this.httpService.getAuthentication();
    this.http.post(this.apiUrl, cityObject, headers)
      .subscribe(response => this.citiesSubject.next(response)); // emit so that we can read the response
  }

}
