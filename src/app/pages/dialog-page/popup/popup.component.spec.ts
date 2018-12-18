import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupComponent } from './popup.component';
import { DIALOG_DATA, DialogService } from '../../../components/dialog.service';
import { DialogController } from '../../../components/dialog/dialog.controller';
import { DialogModule } from '../../../components/dialog/dialog.module';

describe('PopupComponent', () => {
  let component: PopupComponent;
  let fixture: ComponentFixture<PopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DialogModule
      ],
      declarations: [
        PopupComponent
      ],
      providers: [
        {
          provide: DIALOG_DATA,
          useValue: DIALOG_DATA
        },
        {
          provide: DialogController,
          useFactory: () => {
            return {
            };
          }
        },
        {
          provide: DialogService,
          useClass: DialogService
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
