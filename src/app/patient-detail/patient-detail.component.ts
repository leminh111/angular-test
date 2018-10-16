import { Component, OnInit, Input } from '@angular/core';
import { PatientWithDoctorAndFullName } from '../patient';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.scss']
})
export class PatientDetailComponent implements OnInit {

  @Input() patient: PatientWithDoctorAndFullName;

  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService,
  ) { }

  ngOnInit() {
    this.getPatientWithDoctors();
  }

  getPatientWithDoctors(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.patientService.getPatientWithDoctors(id)
      .subscribe(
        patient => this.patient = this.patientService.mapDoctorFullName(patient),
        err => console.error('Observer got an error: ' + err),
        () => this.isLoading = false
      );
  }

}
