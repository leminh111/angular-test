import { Component, OnInit } from '@angular/core';
import { PatientWithDoctorAndFullName } from '../patient';
import { PatientService } from '../patient.service';
import { SortService } from '../sort.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {
  patients: PatientWithDoctorAndFullName[];

  constructor(
    private patientService: PatientService,
    private sortService: SortService,
  ) { }

  ngOnInit() {
    this.getPatientsWithDoctors();
  }

  getPatientsWithDoctors(): void {
    this.patientService.getPatientsWithDoctors()
      .subscribe(patients => {
        this.patients = patients.map(this.patientService.mapDoctorFullName);
      });
  }

  onSorted(event): void {
    this.sortService.sortObjectWithPropName(event.sortColumn, event.sortDirection, this.patients);
  }

}
