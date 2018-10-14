import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Doctor } from './doctor';
import { DOCTORS } from './mock-doctors';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  constructor() { }

  getDoctors(): Observable<Doctor[]> {
      return of(DOCTORS);
  }
}
