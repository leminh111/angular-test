import { Pipe, PipeTransform } from '@angular/core';
import { Address } from './address';

@Pipe({
  name: 'address'
})
export class AddressPipe implements PipeTransform {

  transform(value: Address[]): string {
    const homeAddress = value.find(address => address.type === 'HOME');
    const { phone, email, street, city, zipcode, country} = homeAddress;
    return `<span>${phone}</span>` +
        `<span><a href="mailto:${email}">${email}</a></span>` +
        `<span>${street ? street + ',' : ''} ${city ? city + ',' : ''} ${zipcode ? zipcode + ',' : ''} ${country}</span>`;
  }

}
