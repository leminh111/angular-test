import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { PatientService } from '../patient.service';
import { DoctorService } from '../doctor.service';
import { UtilitiesService } from '../utilities.service';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Doctor } from '../doctor';
import { AddressType } from '../address-type';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss']
})
export class AddPatientComponent implements OnInit {
  addPatientForm: FormGroup;
  doctors: Doctor[];
  filteredDoctors: Observable<Doctor[]>;
  addressTypes = [ AddressType.SECOND_HOME, AddressType.WORK, AddressType.HOLIDAY_PLACE, AddressType.CLOSE_RELATIVE ];

  constructor(
    private patientService: PatientService,
    private doctorService: DoctorService,
    private utilitiesService: UtilitiesService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    this.getDoctors();
    this.initForm();
  }

  handleAddressChange(index, { address_components }) {
    const cityAddress = this.utilitiesService.extractAddress(address_components);
    this.addPatientForm.get(`addresses.${index}`).patchValue(cityAddress);
  }

  initForm() {
    this.addPatientForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      doctor: new FormControl(),
      addresses: new FormArray([
        new FormGroup(this.addAddressControlGroup(AddressType.HOME), { validators: this.utilitiesService.inRomeValidator })
      ])
    });
    this.addresses.controls.forEach(group => {
      const phone = group.get('phone');
      phone.valueChanges
        .subscribe(value => phone.setValue(this.utilitiesService.masking(value), { emitEvent: false }));
    });
  }

  addAddressGroup() {
    return new FormGroup(this.addAddressControlGroup());
  }

  addAddressControlGroup(addressType = '') {
    return {
      type: new FormControl(addressType, Validators.required),
      name: new FormControl(''),
      email: new FormControl('', [ Validators.required, Validators.email ]),
      phone: new FormControl('', Validators.pattern('^\\+?[0-9\\s]+$')),
      street: new FormControl('', Validators.required),
      city: new FormControl({value: '', disabled: true}),
      zipcode: new FormControl({value: '', disabled: true}),
      country: new FormControl({value: '', disabled: true}),
    };
  }

  submitForm() {
    this.patientService.addPatient(this.addPatientForm.getRawValue())
      .subscribe(
        () => this.openDialog('Successfully adding new patient'),
        err => {
          console.error('Observer got an error: ' + err);
          this.openDialog('Fail adding new patient');
        }
      );
  }

  openDialog(message) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { message }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  addAddress() {
    this.addresses.push(this.addAddressGroup());
  }

  removeAddress(index) {
    this.addresses.removeAt(index);
  }

  isHomeAddress(type) {
    return type === AddressType.HOME;
  }

  isWorkorCloseRelativeAddress(type) {
    return type === AddressType.WORK || type === AddressType.CLOSE_RELATIVE;
  }

  getDoctors() {
    this.doctorService.getDoctors()
      .subscribe(
        doctors => {
          this.doctors = doctors;
          this.filteredDoctors = this.doctor.valueChanges
            .pipe(
              startWith<string | Doctor>(''),
              map(value => typeof value === 'string' ? value : `${value.lastName} ${value.firstName}`),
              map(name => name ? this._filter(name) : this.doctors.slice())
            );
        },
        err => {
          console.error('Observer got an error: ' + err);
          this.doctors = [];
          this.filteredDoctors = [];
        }
      );
  }

  private _filter(value: string): Doctor[] {
    if (!this.doctors) { return []; }
    const filterValue = value.toLowerCase();
    return this.doctors.filter(option => {
      const name = `${option.lastName} ${option.firstName}`;
      return name.toLowerCase().includes(filterValue);
    });
  }

  displayDoctorName(doctorId?: number): string | undefined {
    let doctor;
    if (doctorId) {
      doctor = this.doctors.find(doctor => doctor.id === doctorId);
    }
    return doctor ? `${doctor.lastName} ${doctor.firstName}` : undefined;
  }

  get addresses() {
    return this.addPatientForm.get('addresses') as FormArray;
  }

  get doctor() {
    return this.addPatientForm.get('doctor');
  }

  get firstName() {
    return this.addPatientForm.get('firstName');
  }

  get lastName() {
    return this.addPatientForm.get('lastName');
  }

}
