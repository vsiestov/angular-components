import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteContainerComponent } from './autocomplete-container.component';
import { Component } from '@angular/core';
import { AutocompleteComponent } from '../autocomplete/autocomplete.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { ComboboxModule } from '../combobox.module';
import { KEY_ARROW_DOWN, KEY_ESCAPE } from '../../constants';
import { AutocompleteItemComponent } from '../autocomplete-item/autocomplete-item.component';
import { By } from '@angular/platform-browser';

describe('AutocompleteContainerComponent', () => {
  describe('Testing component', () => {
    let component: AutocompleteContainerComponent;
    let fixture: ComponentFixture<AutocompleteContainerComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          OverlayModule
        ],
        declarations: [
          AutocompleteContainerComponent,
          AutocompleteComponent,
          AutocompleteItemComponent
        ]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(AutocompleteContainerComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Testing with dependencies', () => {
    @Component({
      template: `
        <app-autocomplete-container [autocomplete]="auto" [control]="input" [label]="label">
          <label #label for="input-search">Search as you type</label>
          <input #input id="input-search" type="search">

          <app-autocomplete #auto="autocomplete">
            <app-autocomplete-item>Item 1</app-autocomplete-item>
            <app-autocomplete-item>Item 2</app-autocomplete-item>
            <app-autocomplete-item>Item 3</app-autocomplete-item>
            <app-autocomplete-item>Item 4</app-autocomplete-item>
          </app-autocomplete>

        </app-autocomplete-container>
      `
    })
    class TestComponent {

    }

    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          ComboboxModule
        ],
        declarations: [
          TestComponent
        ]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();

      const el = fixture.nativeElement;
      const label = el.querySelector('label');
      const input = el.querySelector('input');
      const container = el.querySelector('[role="combobox"]');

      expect(container.getAttribute('aria-owns'))
        .toEqual(input.getAttribute('aria-controls'));

      expect(label.getAttribute('id'))
        .toEqual(input.getAttribute('aria-labelledby'));
    });

    it('should show autocomplete by focusing input', () => {
      const el = fixture.nativeElement;
      const input = el.querySelector('input');
      const nativeInput = fixture.nativeElement.querySelector('input[type="search"]') as HTMLInputElement;

      nativeInput.dispatchEvent(new Event('focus'));

      const list = document.body.querySelector('[role="listbox"]');
      const items = list.querySelectorAll('.autocomplete__item');

      expect(items.length).toEqual(4);
      expect(list.getAttribute('aria-labelledby'))
        .toEqual(input.getAttribute('aria-labelledby'));
      expect(list.getAttribute('id'))
        .toEqual(input.getAttribute('aria-controls'));

      document.body.dispatchEvent(new Event('click'));

      expect(fixture.nativeElement.querySelectorAll('.autocomplete__item').length).toEqual(0);
    });

    it('should show and close by pressing escape key', () => {
      const nativeInput = fixture.nativeElement.querySelector('input[type="search"]') as HTMLInputElement;

      nativeInput.dispatchEvent(new Event('focus'));

      const list = document.body.querySelector('[role="listbox"]');
      const items = list.querySelectorAll('.autocomplete__item');

      expect(items.length).toEqual(4);

      fixture.debugElement.query(By.css('[role="combobox"]')).triggerEventHandler('keydown', {
        key: KEY_ESCAPE,
        preventDefault: () => {
        }
      });

      expect(document.body.querySelector('[role="listbox"]')).toBeFalsy();
    });

    it('should click on list item', () => {
      const nativeInput = fixture.nativeElement.querySelector('input[type="search"]') as HTMLInputElement;

      nativeInput.dispatchEvent(new Event('focus'));

      const list = document.body.querySelector('[role="listbox"]');
      const items = list.querySelectorAll('.autocomplete__item');

      items[2].dispatchEvent(new Event('click'));

      expect(fixture.nativeElement.querySelector('input').value).toEqual('Item 3');
    });
  });
});
