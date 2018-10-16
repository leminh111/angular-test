import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AddPatientComponent } from './add-patient.component';
import { InMemoryDataService } from '../in-memory-data.service';

describe('AddPatientComponent', () => {
  let component: AddPatientComponent;
  let fixture: ComponentFixture<AddPatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTableModule,
        MatSortModule,
        MatCardModule,
        MatButtonModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        GooglePlaceModule,
        HttpClientModule,
        HttpClientInMemoryWebApiModule.forRoot(
          InMemoryDataService, { dataEncapsulation: false }
        )
      ],
      declarations: [ AddPatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
