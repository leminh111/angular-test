import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
    return this.http.get<Patient[]>(this.patientsUrl);
  }

  getPatient(id: number): Observable<Patient> {
    return this.http.get<Patient>(`${this.patientsUrl}/${id}`);
  }

  getPatientsWithDoctors(): Observable<PatientWithDoctor[]> {
    return this.http.get<PatientWithDoctor[]>(this.patientsWithDoctorsUrl);
  }

  getPatientWithDoctors(id: number): Observable<PatientWithDoctor> {
    // return this.http.get<PatientWithDoctor>(`${this.patientsWithDoctorsUrl}/${id}`).pipe(
    //   catchError(this.handleError<PatientWithDoctor>(`getHero id=${id}`))
    // );
    return this.http.get<PatientWithDoctor>(`${this.patientsWithDoctorsUrl}/${id}`);
  }

  addPatient(patient: Patient): Observable<Patient> {
    // return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
    //   tap((hero: Hero) => this.log(`added hero w/ id=${hero.id}`)),
    //   catchError(this.handleError<Hero>('addHero'))
    // );
    return this.http.post<Patient>(this.patientsUrl, patient);
  }

  mapDoctorFullName(patient: PatientWithDoctor): PatientWithDoctorAndFullName {
    return {
      ...patient,
      doctorFullName: `${patient.doctor.lastName} ${patient.doctor.firstName}`
    };
  }

}
