import { AfterViewInit, Directive, ElementRef, HostBinding, HostListener, Input, OnDestroy, ViewContainerRef } from '@angular/core';
import { TemplatePortal } from '@angular/cdk/portal';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { merge } from 'rxjs';
import { MenuComponent } from './menu.component';

@Directive({
  selector: '[appMenuTrigger]'
})
export class MenuTriggerDirective implements AfterViewInit, OnDestroy {
  @HostBinding('attr.aria-haspopup') ariaHasPopup = true;

  @Input() appMenuTrigger: MenuComponent;

  private portal: TemplatePortal;
  private overlayRef: OverlayRef;

  constructor(
    private el: ElementRef,
    private viewContainerRef: ViewContainerRef,
    private overlay: Overlay
  ) {
  }

  ngAfterViewInit(): void {
    if (!this.appMenuTrigger) {
      return;
    }

    this.portal = new TemplatePortal(this.appMenuTrigger.templateRef, this.viewContainerRef);

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.el)
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top'
        },
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'bottom'
        }
      ]);

    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      positionStrategy,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      scrollStrategy: this.overlay.scrollStrategies.block()
    });

  }

  ngOnDestroy(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }

  private showMenu(): void {
    this.overlayRef.attach(this.portal);
    this.appMenuTrigger.startAnimation();
  }

  private hideMenu(): void {
    this.overlayRef.detach();
    this.appMenuTrigger.resetAnimation();
  }

  @HostListener('click') onElementClick(): void {
    const focusedElement = document.activeElement as HTMLElement;

    this.showMenu();

    this.appMenuTrigger.keyManager
      .setFocusOrigin('program')
      .setFirstItemActive();;

    merge(
      this.overlayRef.backdropClick(),
      this.appMenuTrigger.clicked
    )
      .subscribe(() => {
        this.hideMenu();

        if (focusedElement) {
          focusedElement.focus();
        }

      });
  }

}
