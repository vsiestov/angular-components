import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPageComponent } from './dialog-page.component';
import { DialogModule } from '../../components/dialog/dialog.module';

describe('DialogPageComponent', () => {
  let component: DialogPageComponent;
  let fixture: ComponentFixture<DialogPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DialogModule
      ],
      declarations: [
        DialogPageComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
