import {
  AfterViewInit,
  Component,
  ComponentRef,
  ElementRef,
  EmbeddedViewRef,
  HostBinding, HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  EventEmitter
} from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { CdkPortalOutlet, ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { FocusTrap, FocusTrapFactory } from '@angular/cdk/a11y';
import { animations } from '../dialog.animation';

const throwAttachedError = () => {
  throw Error('Attempting to attach dialog content after content is already attached');
};

@Component({
  selector: 'app-dialog-container',
  templateUrl: './dialog-container.component.html',
  styleUrls: ['./dialog-container.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [animations.show]
})
export class DialogContainerComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(CdkPortalOutlet) outlet: CdkPortalOutlet;
  @HostBinding('class') className = 'dialog-container';
  @HostBinding('tabindex') tabIndex = -1;
  @HostBinding('attr.role') role = 'dialog';
  @HostBinding('attr.aria-modal') ariaModal = true;
  @HostBinding('@showDialog') showDialog = 'void';

  private focusTrap: FocusTrap;

  previousActiveElement: HTMLElement;
  animationState: EventEmitter<AnimationEvent>;

  constructor(
    private el: ElementRef,
    private focusTrapFactory: FocusTrapFactory
  ) {
    this.animationState = new EventEmitter();
  }

  @HostListener('@showDialog.done', ['$event']) onAnimationDone(event) {
    this.animationState.emit(event);
  }

  @HostListener('@showDialog.start', ['$event']) onAnimationStart(event) {
    this.animationState.emit(event);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (!this.focusTrap) {
      this.focusTrap = this.focusTrapFactory.create(this.el.nativeElement);
    }

    this.el.nativeElement.focus();
  }

  ngOnDestroy(): void {
    if (this.focusTrap) {
      this.focusTrap.destroy();
    }

    this.previousActiveElement.focus();
  }

  private saveActiveElement() {
    this.previousActiveElement = document.activeElement as HTMLElement;
  }

  attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C> {
    if (this.outlet.hasAttached()) {
      throwAttachedError();
    }

    this.saveActiveElement();

    return this.outlet.attachTemplatePortal(portal);
  }

  attachComponentPortal<C>(portal: ComponentPortal<C>): ComponentRef<C> {
    if (this.outlet.hasAttached()) {
      throwAttachedError();
    }

    this.saveActiveElement();

    return this.outlet.attachComponentPortal(portal);
  }
}
