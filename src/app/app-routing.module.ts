import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {SignupComponent} from './components/auth/signup/signup.component';
import {LoginComponent} from './components/auth/login/login.component';
import {CitiesPageComponent} from './components/cities-page/cities-page.component';
import {RestaurantsComponent} from './components/restaurants/restaurants.component';
import {MenuItemsComponent} from './components/menu-items/menu-items.component';
import {RestaurantsScreenComponent} from './components/restaurants-screen/restaurants-screen.component';
import {MenuItemsListComponent} from './components/menu-items-list/menu-items-list.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'register',
    component: SignupComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'cities',
    component: CitiesPageComponent,
  },
  {
    path: 'cities/:name/restaurants',
    component: RestaurantsScreenComponent,
    children: [
      {
        path: ':id',
        component: RestaurantsComponent
      }
    ]
  },
  {
    path: 'restaurants',
    component: RestaurantsComponent
  },
  {
    path: 'menuItems',
    component: MenuItemsComponent
  },
  {
    path: 'menuItems/:id',
    component: MenuItemsComponent
  },
  {
    path: 'cities/:name/restaurants/:restaurantId/menuItems/:id',
    component: MenuItemsComponent
  },
  {
    path: 'cities/:name/restaurants/:restaurantId/menuItems',
    component: MenuItemsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
