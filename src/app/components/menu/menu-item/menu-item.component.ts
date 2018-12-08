import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, OnInit } from '@angular/core';
import { FocusOrigin } from '@angular/cdk/a11y';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuItemComponent {
  @HostBinding('attr.tabindex') tabIndex = 0;
  private _document: Document;

  constructor(
    private el: ElementRef
  ) {
  }

  /** Gets the label to be used when determining whether the option should be focused. */
  getLabel(): string {
    const element: HTMLElement = this.el.nativeElement;

    return element.textContent;
  }

  /** This is required method that is called automatically by keyFocusManager */
  focus(origin: FocusOrigin = 'program'): void {
    this.el.nativeElement.focus();
  }

}
