import { Address } from './address';

export class Patient {
    id: number;
    registeredDate: string;
    firstName: string;
    lastName: string;
    doctor: number;
    addresses: Address[];
}