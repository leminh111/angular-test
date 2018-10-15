import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {Patient, PatientWithDoctor, PatientWithDoctorAndFullName} from './patient';
import { PATIENTS } from './mock-patients';
import { PATIENTS_WITH_DOCTORS } from './mock-patients-with-doctors';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  constructor() {}

  getPatients(): Observable<Patient[]> {
    return of(PATIENTS);
  }

  getPatient(id: number): Observable<Patient> {
    return of(PATIENTS.find(patient => patient.id === id));
  }

  getPatientsWithDoctors(): Observable<PatientWithDoctor[]> {
    return of(PATIENTS_WITH_DOCTORS);
  }

  getPatientWithDoctors(id: number): Observable<PatientWithDoctor> {
    return of(PATIENTS_WITH_DOCTORS.find(patient => patient.id === id));
  }

  mapDoctorFullName(patient: PatientWithDoctor): PatientWithDoctorAndFullName {
    return {
      ...patient,
      doctorFullName: `${patient.doctor.lastName} ${patient.doctor.firstName}`
    };
  }

}
