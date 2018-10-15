import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { DoctorService } from '../doctor.service';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Doctor } from '../doctor';
import { Patient } from '../patient';
import { Address } from '../address';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss']
})
export class AddPatientComponent implements OnInit {
  addPatientForm: FormGroup;
  doctors: Doctor[];
  filteredDoctors: Observable<Doctor[]>;
  // TODO
  addressTypes = [
    'Second Home', 'Work', 'Holiday place', 'Close relative'
  ];
  firstAddress: Address = {
    type: ['HOME'],
    name: [],
    email: [''],
    phone: [''],
    street: [''],
    city: [''],
    zipcode: [],
    country: [''],
  };

  constructor(private fb: FormBuilder, private doctorService: DoctorService) { }

  ngOnInit() {
    this.getDoctors();
    this.initForm();
    this.filteredDoctors = this.addPatientForm.valueChanges
      .pipe(
        startWith<string | Doctor>(''),
        map(value => {
          const doctor = value.doctor ? value.doctor : '';
          return typeof doctor === 'string' ? doctor : `${doctor.lastName} ${doctor.firstName}`;
        }),
        map(name => name ? this._filter(name) : this.doctors.slice())
      );
  }

  private _filter(value: string): string[] {
    if (!this.doctors) { return []; }
    const filterValue = value.toLowerCase();
    return this.doctors.filter(option => {
      const name = `${option.lastName} ${option.firstName}`;
      return name.toLowerCase().includes(filterValue);
    });
  }

  displayDoctorName(doctor?: Doctor): string | undefined {
    return doctor ? `${doctor.lastName} ${doctor.firstName}` : undefined;
  }

  initForm() {
    this.addPatientForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      doctor: [],
      addresses: this.fb.array([this.fb.group(this.firstAddress)]),
    });
  }

  addAddressGroup() {
    return this.fb.group({
      ...this.firstAddress,
      type: ['']
    });
  }

  addAddress() {
    this.addresses.push(this.addAddressGroup());
  }

  removeAddress(index) {
    this.addresses.removeAt(index);
  }

  checkIfFirstAddress(index) {
    return index !== 0;
  }

  submitForm() {
    console.log(this.addPatientForm.value);
  }

  getDoctors() {
    this.doctorService.getDoctors()
      .subscribe(doctors => this.doctors = doctors);
  }

  get addresses() {
    return this.addPatientForm.get('addresses') as FormArray;
  }

}
