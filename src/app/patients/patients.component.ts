import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Patient } from '../patient';
import { Doctor } from '../doctor';
import { PatientService } from '../patient.service';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {
  patients: Patient[];

  // TODO Error handling
  constructor(private patientService: PatientService, private doctorService: DoctorService) { }

  ngOnInit() {
    this.getPatientsWithDoctors();
  }

  getPatientsWithDoctors(): void {
    const observables = forkJoin(
      this.patientService.getPatients(),
      this.doctorService.getDoctors()
    );

    observables.subscribe(
      results => {
        const [patients, doctors] = results;

        // TODO error handling
        // TODO bring this into patients service
        this.patients = patients.map(patient => {
          patient.doctorDetail = doctors.find(doctor => doctor.id === patient.doctor);
          patient.doctorFullName = patient.doctorDetail
              ? `${patient.doctorDetail.lastName} ${patient.doctorDetail.firstName}`
              : '';
          return patient;
        });
      },
        // TODO error handling
      e => console.log(`onError: ${e}`)
    );
  }

}
