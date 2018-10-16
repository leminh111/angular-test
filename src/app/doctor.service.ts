import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from './doctor';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private doctorsUrl = 'api/doctors';

  constructor(private http: HttpClient) { }

  getDoctors(): Observable<Doctor[]> {
      return this.http.get<Doctor[]>(this.doctorsUrl);
  }
}
