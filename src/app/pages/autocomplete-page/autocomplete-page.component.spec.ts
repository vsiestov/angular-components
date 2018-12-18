import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompletePageComponent } from './autocomplete-page.component';
import { ComboboxModule } from '../../components/combobox/combobox.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesPipe } from '../../pipes.pipe';

describe('AutocompletePageComponent', () => {
  let component: AutocompletePageComponent;
  let fixture: ComponentFixture<AutocompletePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        ComboboxModule
      ],
      declarations: [
        AutocompletePageComponent,
        PipesPipe
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompletePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
