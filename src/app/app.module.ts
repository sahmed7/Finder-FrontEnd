import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { CitiesPageComponent } from './components/cities-page/cities-page.component';
import { RestaurantsComponent } from './components/restaurants/restaurants.component';
import { MenuItemsComponent } from './components/menu-items/menu-items.component';
import {CityComponent} from './components/city/city.component';
import { RestaurantsScreenComponent } from './components/restaurants-screen/restaurants-screen.component';
import { MenuItemsListComponent } from './components/menu-items-list/menu-items-list.component';
import { RestaurantFormComponent } from './components/restaurant-form/restaurant-form.component';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    SearchbarComponent,
    LoginComponent,
    SignupComponent,
    CitiesPageComponent,
    CityComponent,
    RestaurantsComponent,
    MenuItemsComponent,
    RestaurantsScreenComponent,
    MenuItemsListComponent,
    RestaurantFormComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
