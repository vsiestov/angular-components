import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertComponent } from './alert.component';
import { Component } from '@angular/core';

describe('AlertComponent', () => {
  @Component({
    template: `
      <app-alert>
        I am an alert!
      </app-alert>
    `
  })
  class HostComponent {
  }

  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AlertComponent,
        HostComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create host component with alert', () => {
    const alert = fixture.nativeElement.querySelector('app-alert div');

    expect(component).toBeTruthy();
    expect(alert.getAttribute('role')).toEqual('alert');
    expect(alert.getAttribute('aria-live')).toEqual('assertive');
    expect(alert.getAttribute('aria-atomic')).toEqual('true');
    expect(alert.textContent).toContain('I am an alert!');
  });
});
