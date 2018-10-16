import { Injectable } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor() { }

  masking(value: string): string {
    // Remove all space and add default country code (Italy) if the user doesn't specify it
    let newValue = value.replace(/\s/g, '');
    if (newValue.length > 0 && newValue[0] !== '+') { newValue = `+39${newValue}`; }
    return newValue;
  }

  inRomeValidator(g: FormGroup): ValidationErrors | null {
    const city = g.controls.city.value;
    const country = g.controls.country.value;
    const zipcode = +g.controls.zipcode.value;

    // Rome zipcode is from 00188 to 00199
    const isZipcodeInRomeItaly = 188 <= zipcode && zipcode <= 199;
    const isInRomeBasedOnCityAndCountry = (city === 'Roma' || city === 'Rome') && country === 'Italy';

    return isZipcodeInRomeItaly || isInRomeBasedOnCityAndCountry
      ? null : {'notInRome': true};
  }
}
