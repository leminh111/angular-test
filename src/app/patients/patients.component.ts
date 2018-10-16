import { Component, OnInit, ViewChild } from '@angular/core';
import { PatientWithDoctorAndFullName } from '../patient';
import { PatientService } from '../patient.service';
import { MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {
  patients: PatientWithDoctorAndFullName[];
  columnsToDisplay: string[] = ['lastName', 'firstName', 'registeredDate', 'doctorFullName', 'address'];
  isLoading = true;
  dataSource;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private patientService: PatientService) { }

  ngOnInit() {
    this.getPatientsWithDoctors();
  }

  getPatientsWithDoctors(): void {
    this.patientService.getPatientsWithDoctors()
      .subscribe(patients => {
        this.patients = patients.map(this.patientService.mapDoctorFullName);
        this.dataSource = new MatTableDataSource(this.patients);
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      });
  }

}
