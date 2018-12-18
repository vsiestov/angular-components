import { Observable, Subject } from 'rxjs';
import { AnimationEvent } from '@angular/animations';
import { OverlayRef } from '@angular/cdk/overlay';
import { KEY_ESCAPE } from '../constants';
import { DialogContainerComponent } from './dialog-container/dialog-container.component';

export class DialogController {
  private _afterClosed: Subject<any>;
  private backdropClickSub: any;
  private result: any;

  constructor(
    private dialogContainerRef: DialogContainerComponent,
    private overlay: OverlayRef
  ) {
    this._afterClosed = new Subject();

    this.backdropClickSub = this.overlay.backdropClick().subscribe(() => {
      this.close();
    });

    this.overlay.keydownEvents().subscribe((event) => {
      if (event.key === KEY_ESCAPE) {
        this.close();
      }
    });

    this.dialogContainerRef.animationState.subscribe((event: AnimationEvent) => {
      if (event.fromState === 'enter' && event.toState === 'void' && event.phaseName === 'done') {
        this.destroy();
      }
    });

    this.dialogContainerRef.showDialog = 'enter';
  }

  destroy() {
    this.overlay.detach();
    this.backdropClickSub.unsubscribe();
    this._afterClosed.next(this.result);
    this._afterClosed.complete();
  }

  close(result?: any) {
    this.dialogContainerRef.showDialog = 'void';
    this.result = result;
  }

  afterClosed(): Observable<any> {
    return this._afterClosed.asObservable();
  }
}
