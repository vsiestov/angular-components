import { Injectable, InjectionToken, Injector, TemplateRef } from '@angular/core';
import { ComponentType, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { DialogContainerComponent } from './dialog/dialog-container/dialog-container.component';
import { IDialogConfig } from './dialog/dialog.interface';
import { DialogController } from './dialog/dialog.controller';

class DialogInjector implements Injector {
  constructor(private map: WeakMap<any, any>) { }

  get(token: any): any {
    return this.map.get(token);
  }
}

export const DIALOG_DATA = new InjectionToken<any>('DialogData');

@Injectable()
export class DialogService {
  constructor(
    private overlay: Overlay
  ) {
  }

  private createOverlay() {
    return this.overlay.create({
      hasBackdrop: true,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy: this.overlay
        .position()
        .global()
        .centerVertically()
        .centerHorizontally()
    });
  }

  private attachContainer(overlay: OverlayRef): DialogContainerComponent {
    const portal = new ComponentPortal(DialogContainerComponent);
    const ref = overlay.attach(portal);

    return ref.instance;
  }

  private attachComponent(
    component: ComponentType<any> | TemplateRef<any>,
    container: DialogContainerComponent,
    config: IDialogConfig,
    overlay: OverlayRef
  ) {
    const injectionData = new WeakMap();
    const dialogRef = new DialogController(container, overlay);

    injectionData.set(DIALOG_DATA, config.data);
    injectionData.set(DialogController, dialogRef);

    const isTemplate = component instanceof TemplateRef;
    const portal =  isTemplate ?
      new TemplatePortal(component as TemplateRef<any>, config.view, {
        $implicit: config.data
      }) :
      new ComponentPortal(component as ComponentType<any>, null, new DialogInjector(injectionData));

    if (isTemplate) {
      container.attachTemplatePortal(portal as TemplatePortal);
    } else {
      container.attachComponentPortal(portal as ComponentPortal<any>);
    }

    return dialogRef;
  }

  open(component: ComponentType<any> | TemplateRef<any>, config: IDialogConfig) {
    const overlay = this.createOverlay();

    const containerRef = this.attachContainer(overlay);

    return this.attachComponent(component, containerRef, config, overlay);
  }
}
