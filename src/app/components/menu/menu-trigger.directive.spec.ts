import { MenuTriggerDirective } from './menu-trigger.directive';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { By } from '@angular/platform-browser';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { MenuComponent } from './menu.component';
import { KEY_ENTER, KEY_ESCAPE } from '../constants';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('MenuTriggerDirective', () => {
  @Component({
    template: `
      <button [appMenuTrigger]="menu">Show menu</button>

      <app-menu #menu="menu">
        <app-menu-item>Hello</app-menu-item>
        <app-menu-item>Angular</app-menu-item>
        <app-menu-item>World</app-menu-item>
      </app-menu>
    `
  })
  class TestComponent { }

  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        OverlayModule,
        NoopAnimationsModule
      ],
      declarations: [
        MenuComponent,
        MenuItemComponent,
        MenuTriggerDirective,
        TestComponent
      ],
      providers: [
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('should click on the trigger', () => {
    fixture.debugElement.query(By.css('button')).triggerEventHandler('click', null);

    const list = document.querySelector('[role="menu"]');
    const button = fixture.nativeElement.querySelector('button');

    expect(list).toBeTruthy();
    expect(button.getAttribute('aria-haspopup')).toEqual('true');
    expect(list.querySelectorAll('app-menu-item').length).toEqual(3);
  });

  it('should open menu and close by clicking outside', () => {
    const button = fixture.debugElement.query(By.css('button'));

    button.triggerEventHandler('click', null);

    const list = document.querySelector('[role="menu"]');
    const items = list.querySelectorAll('app-menu-item');

    expect(list).toBeTruthy();
    expect(document.activeElement === items[0]).toBeTruthy();

    const backdrop = list.parentNode.parentNode.parentNode.querySelector('.cdk-overlay-transparent-backdrop');

    backdrop.dispatchEvent(new Event('click'));

    expect(document.querySelector('[role="menu"]').classList.contains('ng-animate-queued')).toBeTruthy();
  });

  it('should close menu by pressing escape key', () => {
    const button = fixture.debugElement.query(By.css('button'));

    button.triggerEventHandler('click', null);

    fixture.debugElement.query(By.css('[role="menu"]')).triggerEventHandler('keydown', {
      key: KEY_ESCAPE
    });

    expect(document.querySelector('[role="menu"]').classList.contains('ng-animate-queued')).toBeTruthy();
  });

  it('should close menu by pressing enter key', () => {
    const button = fixture.debugElement.query(By.css('button'));

    button.triggerEventHandler('click', null);

    fixture.debugElement.query(By.css('[role="menu"]')).triggerEventHandler('keydown', {
      key: KEY_ENTER,
      preventDefault: () => {
      }
    });

    expect(document.querySelector('[role="menu"]').classList.contains('ng-animate-queued')).toBeTruthy();
  });
});
