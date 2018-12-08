import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { FocusKeyManager } from '@angular/cdk/a11y';
import { uniqueId } from 'lodash-es';
import { KEY_ARROW_DOWN, KEY_ARROW_UP, KEY_ENTER, KEY_ESCAPE } from '../constants';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { animations } from './menu.animations';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'menu',
  animations: [
    animations.show
  ]
})
export class MenuComponent implements OnInit, AfterViewInit, AfterContentInit {
  @Input() label: string;
  @Output() clicked: EventEmitter<string>;
  @ViewChild(TemplateRef) templateRef: TemplateRef<any>;
  @ContentChildren(MenuItemComponent) items: QueryList<MenuItemComponent>;

  id: string;
  keyManager: FocusKeyManager<any>;
  animationState: 'void' | 'enter' = 'void';

  constructor() {
    this.clicked = new EventEmitter();
  }

  ngOnInit(): void {
    this.id = uniqueId('menu');
    this.label = '';
  }

  ngAfterContentInit(): void {
    this.keyManager = new FocusKeyManager(this.items).withWrap();
    this.keyManager.tabOut.subscribe(() => {
      this.clicked.emit('tab');
    });
  }

  ngAfterViewInit(): void {
  }

  startAnimation() {
    this.animationState = 'enter';
  }

  resetAnimation() {
    this.animationState = 'void';
  }

  keyDownHandler(event: KeyboardEvent) {
    const key = event.key;

    switch (key) {
      case KEY_ESCAPE:
        this.clicked.emit('keyDown');
        break;

      case KEY_ENTER:
        event.preventDefault(); // Prevent opening menu right after closing it

        this.clicked.emit('keyDown');
        break;

      default:
        if (key === KEY_ARROW_UP || key === KEY_ARROW_DOWN) {
          this.keyManager.setFocusOrigin('keyboard');
        }

        this.keyManager.onKeydown(event);
    }
  }
}
