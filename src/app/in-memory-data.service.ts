import { InMemoryDbService } from 'angular-in-memory-web-api';
import { PATIENTS } from './mock-patients';
import { PATIENTS_WITH_DOCTORS } from './mock-patients-with-doctors';
import { DOCTORS } from './mock-doctors';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const patients = PATIENTS;
    const patientsWithDoctors = PATIENTS_WITH_DOCTORS;
    const doctors = DOCTORS;

    return {
      patients,
      patientsWithDoctors,
      doctors
    };
  }
}
