import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  OnInit,
  Output
} from '@angular/core';
import { Highlightable } from '@angular/cdk/a11y';

@Component({
  selector: 'app-autocomplete-item',
  templateUrl: './autocomplete-item.component.html',
  styleUrls: ['./autocomplete-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutocompleteItemComponent implements OnInit, Highlightable {
  @Output() clicked: EventEmitter<string>;

  @HostBinding('attr.tabindex') tabIndex = 0;
  @HostBinding('attr.aria-selected') get active() {
    return this.selected;
  }

  private _selected: boolean;

  constructor(
    private el: ElementRef,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this._selected = false;
    this.clicked = new EventEmitter();
  }

  ngOnInit() {
  }

  get selected(): string {
    if (typeof(this._selected) === 'undefined') {
      return 'false';
    }

    return this._selected.toString();
  }

  /**
   * This method sets display styles on the option to make it appear
   * active. This is used by the ActiveDescendantKeyManager so key
   * events will display the proper options as active on arrow key events.
   */
  setActiveStyles(): void {
    if (!this._selected) {
      this._selected = true;
      this.changeDetectorRef.markForCheck();

      this.el.nativeElement.scrollIntoView({
        block: 'center'
      });
    }
  }

  /**
   * This method removes display styles on the option that made it appear
   * active. This is used by the ActiveDescendantKeyManager so key
   * events will display the proper options as active on arrow key events.
   */
  setInactiveStyles(): void {
    if (this._selected) {
      this._selected = false;
      this.changeDetectorRef.markForCheck();
    }
  }

  get viewValue(): string {
    return (this.el.nativeElement.textContent || '').trim();
  }

  onClick(): void {
    this.clicked.emit(this.viewValue);
  }
}
