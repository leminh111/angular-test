import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import { Patient } from '../patient';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss']
})
export class AddPatientComponent implements OnInit {
  addPatientForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.addPatientForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      addresses: this.fb.array([this.addAddressGroup()]),
    });
  }

  addAddressGroup() {
    return this.fb.group({
      street: [''],
      city: [''],
      zip: [''],
      state: [''],
    });
  }

  addAddress() {
    this.addresses.push(this.addAddressGroup());
  }

  removeAddress(index) {
    this.addresses.removeAt(index);
  }

  submitForm() {
    console.log(this.addPatientForm.value);
  }

  get addresses() {
    return this.addPatientForm.get('addresses') as FormArray;
  }

}
