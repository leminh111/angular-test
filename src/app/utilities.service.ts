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

  extractAddress(address_components) {
    let value = {
      city: '',
      country: '',
      zipcode: ''
    };

    // Since the address_components are returned sorted from street number to country,
    // we get the city by first checking for locality up to administrative_area_level_1
    const city = address_components.find(component => {
      return component.types[0] === 'locality'
        || component.types[0] === 'administrative_area_level_3'
        || component.types[0] === 'administrative_area_level_2'
        || component.types[0] === 'administrative_area_level_1';
    });
    value.city = city ? city.long_name : '';

    address_components.forEach(component => {
      const componentName = component.long_name;

      switch (component.types[0]) {
        case 'country':
          value.country = componentName;
          break;
        case 'postal_code':
          value.zipcode = componentName;
          break;
      }
    });

    return value;
  }
}
