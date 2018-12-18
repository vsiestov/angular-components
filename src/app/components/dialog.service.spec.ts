import { TestBed } from '@angular/core/testing';

import { DIALOG_DATA, DialogService } from './dialog.service';
import { Component, Inject, NgModule, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { DialogContainerComponent } from './dialog/dialog-container/dialog-container.component';
import { PortalModule } from '@angular/cdk/portal';
import { DialogController } from './dialog/dialog.controller';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('DialogService', () => {
  @Component({
    selector: 'app-popup',
    template: `
      <ng-template>
        <div>
          <header>
            Popup header
          </header>
          <section>
            Popup Content
          </section>
          <footer>
            Popup footer
          </footer>
        </div>
      </ng-template>
    `
  })
  class PopupTemplateComponent {
    @ViewChild(TemplateRef) templateRef: TemplateRef<any>;
  }

  @Component({
    template: `
      <div class="popup__content">
        I am a component. All my content will be a content of popup container
      </div>
    `
  })
  class PopupComponent {
    constructor(
      public dialogController: DialogController,
      @Inject(DIALOG_DATA) public data: any
    ) {
    }
  }

  @Component({
    template: `
      <app-popup></app-popup>

      <button (click)="openDialog()">Open dialog</button>
    `,
    entryComponents: [
      PopupComponent
    ]
  })
  class HostComponent {
    @ViewChild(PopupTemplateComponent) popup: PopupTemplateComponent;

    constructor(
      private dialogService: DialogService,
      private viewContainerRef: ViewContainerRef
    ) {
    }

    openDialog() {
      this.dialogService.open(this.popup.templateRef, {
        view: this.viewContainerRef
      });
    }

    openComponentDialog() {
      this.dialogService.open(PopupComponent, {
        view: this.viewContainerRef,
        data: {
          params1: 'value1',
          params2: 'value2'
        }
      });
    }
  }

  @NgModule({
    imports: [
      OverlayModule,
      PortalModule,
      NoopAnimationsModule
    ],
    providers: [
    ],
    declarations: [
      DialogContainerComponent,
      PopupComponent
    ],
    exports: [
      DialogContainerComponent,
      PopupComponent
    ],
    entryComponents: [
      DialogContainerComponent,
      PopupComponent
    ]
  })
  class HostModule { }

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HostModule
    ],
    declarations: [
      HostComponent,
      PopupTemplateComponent
    ],
    providers: [
      DialogService
    ]
  }));

  it('should be created', () => {
    const service: DialogService = TestBed.get(DialogService);

    expect(service).toBeTruthy();
  });

  it('should open a dialog using template', () => {
    const fixture = TestBed.createComponent(HostComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component).toBeTruthy();
    component.openDialog();

    expect(document.body.querySelector('.cdk-overlay-container header').textContent).toContain('Popup header');
  });

  it('should open a dialog using component', () => {
    const fixture = TestBed.createComponent(HostComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component).toBeTruthy();

    component.openComponentDialog();

    expect(document.body.querySelector('.cdk-overlay-container .popup__content').textContent)
      .toContain('I am a component. All my content will be a content of popup container');
  });
});
