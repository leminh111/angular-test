import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { DoctorService } from '../doctor.service';
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

  constructor(private doctorService: DoctorService) { }

  ngOnInit() {
    this.getDoctors();
    this.initForm();
  }

  handleAddressChange(index, { address_components, formatted_address }) {
    this.addPatientForm.get(`addresses.${index}.street`).setValue(formatted_address);

    address_components.forEach(component => {
      if (component['types'].indexOf("administrative_area_level_1") > -1) {
        this.addPatientForm.get(`addresses.${index}.city`).setValue(component['long_name']);
      } else if (component['types'].indexOf("country") > -1) {
        this.addPatientForm.get(`addresses.${index}.country`).setValue(component['long_name']);
      } else if (component['types'].indexOf("postal_code") > -1) {
        this.addPatientForm.get(`addresses.${index}.zipcode`).setValue(component['long_name']);
      }
    });
  }

  private _filter(value: string): Doctor[] {
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
    this.addPatientForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      doctor: new FormControl(),
      addresses: new FormArray([
        new FormGroup({
          type: new FormControl(AddressType.HOME),
          name: new FormControl(),
          email: new FormControl(''),
          phone: new FormControl(''),
          street: new FormControl(''),
          city: new FormControl({value: '', disabled: true}),
          zipcode: new FormControl({value: '', disabled: true}),
          country: new FormControl({value: '', disabled: true}),
        })
      ])
    });
    this.filteredDoctors = this.doctor.valueChanges
      .pipe(
        startWith<string | Doctor>(''),
        map(value => typeof value === 'string' ? value : `${value.lastName} ${value.firstName}`),
        map(name => name ? this._filter(name) : this.doctors.slice())
      );
  }

  addAddressGroup() {
    return new FormGroup({
      type: new FormControl(),
      name: new FormControl(),
      email: new FormControl(''),
      phone: new FormControl(''),
      street: new FormControl(''),
      city: new FormControl({value: '', disabled: true}),
      zipcode: new FormControl({value: '', disabled: true}),
      country: new FormControl({value: '', disabled: true}),
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

  get doctor() {
    return this.addPatientForm.get('doctor');
  }

}
