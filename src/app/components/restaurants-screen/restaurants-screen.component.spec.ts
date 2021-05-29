import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantsScreenComponent } from './restaurants-screen.component';

describe('RestaurantsScreenComponent', () => {
  let component: RestaurantsScreenComponent;
  let fixture: ComponentFixture<RestaurantsScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantsScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantsScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
