import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor() { }

  masking(value: string): string {
    // Remove all space and add default country code (Italy) if the user doesn't specify it
    let newValue = value.replace(/\s/g, '');
    if (newValue[0] !== '+') { newValue = `+39${newValue}`; }
    return newValue;
  }
}
