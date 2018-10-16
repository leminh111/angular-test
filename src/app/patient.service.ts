import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Patient, PatientWithDoctor, PatientWithDoctorAndFullName } from './patient';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private patientsUrl = 'api/patients';
  private patientsWithDoctorsUrl = 'api/patientsWithDoctors';

  constructor(private http: HttpClient) {}

  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.patientsUrl)
      .pipe(
        catchError(this.handleError('getPatients', []))
      );
  }

  getPatient(id: number): Observable<Patient> {
    return this.http.get<Patient>(`${this.patientsUrl}/${id}`)
      .pipe(
        catchError(this.handleError('getPatient', []))
      );
  }

  getPatientsWithDoctors(): Observable<PatientWithDoctor[]> {
    return this.http.get<PatientWithDoctor[]>(this.patientsWithDoctorsUrl)
      .pipe(
        catchError(this.handleError('getPatientsWithDoctors', []))
      );
  }

  getPatientWithDoctors(id: number): Observable<PatientWithDoctor> {
    // return this.http.get<PatientWithDoctor>(`${this.patientsWithDoctorsUrl}/${id}`).pipe(
    //   catchError(this.handleError<PatientWithDoctor>(`getHero id=${id}`))
    // );
    return this.http.get<PatientWithDoctor>(`${this.patientsWithDoctorsUrl}/${id}`)
      .pipe(
        catchError(this.handleError('getPatientWithDoctors', []))
      );
  }

  addPatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(this.patientsUrl, patient)
      .pipe(
        catchError(this.handleError('addPatient', []))
      );
  }

  mapDoctorFullName(patient: PatientWithDoctor): PatientWithDoctorAndFullName {
    return {
      ...patient,
      doctorFullName: `${patient.doctor.lastName} ${patient.doctor.firstName}`
    };
  }

  // Should create a parent service, extend that service and bring this method into that parent service
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
