import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Patient, PatientWithDoctor } from './patient';
import { Doctor } from './doctor';
import { PATIENTS } from './mock-patients';

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

  // TODO Maybe need to define a new patient type
  // TODO error handling
  getPatientsWithDoctors(patients: Patient[], doctors: Doctor[]): PatientWithDoctor[] {
    return patients.map(patient => {
      const patientWithDoctor = {
        id: patient.id,
        registeredDate: patient.registeredDate,
        firstName: patient.firstName,
        lastName: patient.lastName,
        doctor: patient.doctor,
        doctorDetail: doctors.find(doctor => doctor.id === patient.doctor),
        doctorFullName: '',
        addresses: patient.addresses
      };
      patientWithDoctor.doctorFullName = patientWithDoctor.doctorDetail
        ? `${patientWithDoctor.doctorDetail.lastName} ${patientWithDoctor.doctorDetail.firstName}`
        : '';
      return patientWithDoctor;
    });
  }
}
