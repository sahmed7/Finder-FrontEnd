import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MenuItemService} from '../../services/menuItem/menu-item.service';

@Component({
  selector: 'app-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.less']
})
export class MenuItemsComponent implements OnInit {

  public menuItemName: string;
  public menuItemDescription: string;
  errorText = '';
  menuItems: any[];
  menuItemId: any;
  restaurantId: any;
  singleMenuItem: any;
  editAction: boolean;

  constructor(private route: ActivatedRoute, private menuItemService: MenuItemService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params);
      this.menuItemId = params.id;
      this.menuItemService.menuItemsSubject.subscribe(response => {
        this.singleMenuItem = response;
        console.log('The response is: ');
        console.log(response);
        console.log(this.singleMenuItem);
      });
      this.menuItemService.getSingleMenuItem(this.menuItemId);
    });

    this.menuItemService.menuItemModSubject.subscribe(editAction => this.editAction = editAction);

  }

  getSingleMenuItem(): any {
    this.singleMenuItem = this.menuItemService.getSingleMenuItem(this.menuItemId);
  }
  editingEnabled(): void {
    this.menuItemService.menuItemEditing(true);
  }
  editingDisabled(): void {
    this.menuItemService.menuItemEditing(false);
  }
  updateMenuItem(): any {
    const updatedMenuItem = {name: this.menuItemName, description: this.menuItemDescription};
    this.menuItemService.updateMenuItem(updatedMenuItem).subscribe(response => {
      this.menuItems = [...this.menuItems, response];
    });
  }
  deleteMenuItem(): any {
    this.menuItemService.deleteMenuItem().subscribe(response => {
      this.menuItems = [...this.menuItems, response];
    });
  }

  addMenuItem(): any {
    const newItem = {name: this.menuItemName, description: this.menuItemDescription};
    this.menuItemService.addMenuItem(newItem).subscribe(response => {
      this.menuItems = [...this.menuItems, response];
     });
  }

}
