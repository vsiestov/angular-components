import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogContainerComponent } from './dialog-container.component';
import { AfterViewInit, Component, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { PortalModule, TemplatePortal } from '@angular/cdk/portal';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('DialogContainerComponent', () => {
  @Component({
    template: `
      <ng-template #template>
        <h1>Popup Content</h1>
      </ng-template>

      <app-dialog-container></app-dialog-container>
    `
  })
  class HostComponent implements AfterViewInit {
    @ViewChild('template') templateRef: TemplateRef<any>;
    @ViewChild(DialogContainerComponent) dialogContainer: DialogContainerComponent;

    constructor(
      private viewContainerRef: ViewContainerRef
    ) { }

    ngAfterViewInit(): void {
      this.dialogContainer.attachTemplatePortal(new TemplatePortal<any>(this.templateRef, this.viewContainerRef));
    }
  }

  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        PortalModule,
        NoopAnimationsModule
      ],
      declarations: [
        HostComponent,
        DialogContainerComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const content = fixture.nativeElement.querySelector('app-dialog-container').textContent;

    expect(component).toBeTruthy();
    expect(content).toContain('Popup Content');
  });
});
