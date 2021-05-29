import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItemsListComponent } from './menu-items-list.component';

describe('MenuItemsListComponent', () => {
  let component: MenuItemsListComponent;
  let fixture: ComponentFixture<MenuItemsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuItemsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuItemsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
