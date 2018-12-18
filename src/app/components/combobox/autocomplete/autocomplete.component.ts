import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EventEmitter, OnDestroy,
  OnInit, Output,
  QueryList,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { AutocompleteItemComponent } from '../autocomplete-item/autocomplete-item.component';
import { merge } from 'rxjs';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'autocomplete'
})
export class AutocompleteComponent implements OnInit, AfterViewInit, OnDestroy {
  @Output() chosen: EventEmitter<object>;
  @ViewChild(TemplateRef) templateRef: TemplateRef<any>;
  @ContentChildren(AutocompleteItemComponent, {
    descendants: true
  }) items: QueryList<AutocompleteItemComponent>;

  labelledBy: string;
  id: string;
  closed: EventEmitter<string>;
  keyManager: ActiveDescendantKeyManager<any>;
  sub: any;

  constructor() {
    this.closed = new EventEmitter();
    this.chosen = new EventEmitter();
  }

  ngOnInit() {
  }

  subscribeItemClick() {
    if (this.sub) {
      this.sub.unsubscribe();
    }

    this.sub = merge(...this.items.map((item) => {
      return item.clicked;
    }))
      .subscribe((value: string) => {
        this.chosen.emit({
          type: 'click',
          value
        });
      });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  ngAfterViewInit(): void {
    this.items.changes.subscribe(() => {
      this.subscribeItemClick();
    });

    this.subscribeItemClick();

    this.keyManager = new ActiveDescendantKeyManager(this.items).withWrap();
    this.keyManager.tabOut.subscribe(() => {
      this.closed.emit('tab');
    });
  }
}
