import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuPageComponent } from './menu-page.component';
import { MenuModule } from '../../components/menu/menu.module';
import { By } from '@angular/platform-browser';

describe('MenuPageComponent', () => {
  let component: MenuPageComponent;
  let fixture: ComponentFixture<MenuPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MenuModule
      ],
      declarations: [ MenuPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open the menu and choose an item', () => {
    spyOn(console, 'log').and.callThrough();
    fixture.debugElement.query(By.css('button')).triggerEventHandler('click', null);
    fixture.debugElement.query(By.css('app-menu-item:nth-child(2)')).triggerEventHandler('click', null);

    expect(console.log).toHaveBeenCalledWith({
      title: 'Angular'
    });
  });
});
