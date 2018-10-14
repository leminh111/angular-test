import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Patient } from './patient';
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
}
