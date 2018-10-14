import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Patient } from '../patient';
import { PatientService } from '../patient.service';
import { DoctorService } from '../doctor.service';
import { SortService } from '../sort.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {
  patients: Patient[];

  constructor(
    private patientService: PatientService,
    private doctorService: DoctorService,
    private sortService: SortService,
  ) { }

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
        this.patients = this.patientService.getPatientsWithDoctors(patients, doctors);
      },
        // TODO error handling
      e => console.log(`onError: ${e}`)
    );
  }

  onSorted(event): void {
    this.sortService.sortObjectWithPropName(event.sortColumn, event.sortDirection, this.patients);
  }

}
