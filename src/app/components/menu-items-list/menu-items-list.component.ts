import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {MenuItemService} from '../../services/menuItem/menu-item.service';
import {ActivatedRoute} from '@angular/router';
import {CityService} from '../../services/city/city.service';

@Component({
  selector: 'app-menu-items-list',
  templateUrl: './menu-items-list.component.html',
  styleUrls: ['./menu-items-list.component.less']
})
export class MenuItemsListComponent implements OnInit, OnChanges {
  cities: [];
  city: any;
  restaurants: [];
  restaurantId: any;
  menuItems: any[];
  errorText = '';
  @Input() isEditing = false;
  editAction: boolean;
  cityName: string;

  constructor(private menuItemService: MenuItemService, private route: ActivatedRoute, private cityService: CityService) { }

  ngOnChanges(): void {
    this.route.params.subscribe(params => {
      console.log(params);
      this.restaurantId = params.id;
      this.getMenuItems();
    });
  }

  ngOnInit(): void {
    this.menuItemService.menuItemModSubject.subscribe(editAction => this.editAction = editAction);
    this.route.params.subscribe(params => {
      console.log(params);
      this.restaurantId = params.id;
      this.city = this.cityService.currentCity;
      this.cityName = this.city[0].name;
      this.getMenuItems();
      console.log(this.city);
    });
  }

  editingEnabled(): void {
    this.menuItemService.menuItemEditing(true);
    console.log(this.editAction);
  }

  editingDisabled(): void {
    this.menuItemService.menuItemEditing(false);
    console.log(this.editAction);
  }

  getMenuItems(): any {
    this.menuItemService.getMenuItems$(this.restaurantId).subscribe(response => {
      this.menuItems = response;
      console.log(this.menuItems);
    });
    this.menuItemService.errorSubject.subscribe((error: string) => this.errorText = error);
  }

}
