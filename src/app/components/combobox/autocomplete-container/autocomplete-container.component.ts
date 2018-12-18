import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component, HostListener,
  Input,
  OnDestroy,
  OnInit,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import { uniqueId } from 'lodash-es';
import { AutocompleteComponent } from '../autocomplete/autocomplete.component';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { fromEvent, merge } from 'rxjs';
import { IEventType, KEY_ARROW_DOWN, KEY_ENTER, KEY_ESCAPE } from '../../constants';

@Component({
  selector: 'app-autocomplete-container',
  templateUrl: './autocomplete-container.component.html',
  styleUrls: ['./autocomplete-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AutocompleteContainerComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() autocomplete: AutocompleteComponent;
  @Input() control: HTMLInputElement | HTMLSelectElement;
  @Input() label: HTMLLabelElement;

  ariaOwns: string;
  labelId: string;
  overlayRef: OverlayRef;
  portal: TemplatePortal;
  isExpanded: boolean;
  closeActionsSubscription: any;

  constructor(
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef
  ) {
    this.ariaOwns = uniqueId('autocomplete-list');
    this.labelId = uniqueId('autocomplete-label');
    this.isExpanded = false;
    this.onInputFocus = this.onInputFocus.bind(this);
    this.onInputKeyDown = this.onInputKeyDown.bind(this);
    this.onInputInput = this.onInputInput.bind(this);
  }

  private showList() {
    this.overlayRef.attach(this.portal);
    this.isExpanded = true;

    this.subscribeToClosingActions();
  }

  private hideList() {
    this.unsubscribeClosingActions();

    this.autocomplete.keyManager.setActiveItem(-1);
    this.overlayRef.detach();
    this.isExpanded = false;
  }

  private subscribeToClosingActions() {
    this.closeActionsSubscription = merge(
      this.overlayRef.backdropClick(),
      this.autocomplete.closed,
      this.autocomplete.chosen
    )
      .subscribe((response: string | IEventType) => {
        const keyManager = this.autocomplete.keyManager;

        switch (response) {
          case KEY_ENTER: {
            const activeItem = keyManager.activeItem;

            if (activeItem) {
              this.updateInputValue(activeItem.viewValue);
            }

            break;
          }

          default:
            if (typeof response === 'object' && response.value) {
              this.updateInputValue(response.value);
            }
        }

        this.hideList();
      });
  }

  private unsubscribeClosingActions() {
    if (this.closeActionsSubscription) {
      this.closeActionsSubscription.unsubscribe();
    }
  }

  private preparePortal(): void {
    this.portal = new TemplatePortal(this.autocomplete.templateRef, this.viewContainerRef);
  }

  private prepareOverlay(): void {
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.control)
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
      positionStrategy,
      hasBackdrop: false,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      minWidth: this.control.clientWidth
    });

  }

  ngOnInit(): void {
  }

  get isListVisible(): boolean {
    return this.overlayRef && this.overlayRef.hasAttached();
  }

  onInputFocus(): void {
    if (!this.isListVisible) {
      this.showList();
    }
  }

  onInputKeyDown(event: KeyboardEvent): void {
    if (event.key === KEY_ARROW_DOWN && !this.isListVisible) {
      this.showList();
    }
  }

  onInputInput(): void {
    if (!this.isListVisible) {
      this.showList();
    }

    this.autocomplete.keyManager.setActiveItem(-1);
  }

  configureControls(): boolean {
    const input = this.control;
    const label = this.label;

    if (!input) {
      return false;
    }

    if (label) {
      if (label.hasAttribute('id')) {
        this.labelId = label.getAttribute('id');
      } else {
        label.setAttribute('id', this.labelId);
      }
    }

    input.setAttribute('aria-autocomplete', 'both');
    input.setAttribute('aria-controls', this.ariaOwns);

    if (label) {
      input.setAttribute('aria-labelledby', this.labelId);
    }

    input.addEventListener('focus', this.onInputFocus, false);
    input.addEventListener('keydown', this.onInputKeyDown, false);
    input.addEventListener('input', this.onInputInput, false);

    return true;
  }

  updateInputValue(value: string): void {
    this.control.value = value;
    this.control.dispatchEvent(new Event('input'));
  }

  handleKeyDown(event: KeyboardEvent): void {
    const key = event.key;

    switch (key) {
      case KEY_ESCAPE:

        if (this.isListVisible) {
          event.preventDefault();
        }

        this.autocomplete.closed.emit('escape');
        break;

      case KEY_ENTER:
        this.autocomplete.closed.emit(KEY_ENTER);
        break;

      default:
        this.autocomplete.keyManager.onKeydown(event);
    }
  }

  @HostListener('document:click', ['$event']) onDocumentClick(event: MouseEvent) {
    if (!this.isExpanded) {
      return;
    }

    if (
      event.target !== this.control &&
      event.target !== this.label &&
      event.target !== this.label &&
      !(this.portal.origin.nativeElement as HTMLElement).contains(event.target as HTMLElement)
    ) {
      this.hideList();
      return;
    }
  }

  ngAfterViewInit(): void {
    if (!this.configureControls()) {
      return;
    }

    this.autocomplete.id = this.ariaOwns;
    this.autocomplete.labelledBy = this.labelId;

    this.preparePortal();
    this.prepareOverlay();
  }

  ngOnDestroy(): void {
    if (this.control) {
      this.control.removeEventListener('focus', this.onInputFocus, false);
      this.control.removeEventListener('keydown', this.onInputKeyDown, false);
      this.control.removeEventListener('input', this.onInputInput, false);
    }

    if (this.overlayRef) {
      this.overlayRef.dispose();
    }

    this.unsubscribeClosingActions();
  }

}
