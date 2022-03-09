import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationFiltersComponent } from './navigation-filters.component';

describe('NavigationFiltersComponent', () => {
  let component: NavigationFiltersComponent;
  let fixture: ComponentFixture<NavigationFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
