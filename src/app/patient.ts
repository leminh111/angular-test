import { Address } from './address';
import { Doctor } from './doctor';

export class Patient {
    id: number;
    registeredDate: string;
    firstName: string;
    lastName: string;
    doctor: number;
    addresses: Address[];
}

export class PatientWithDoctor {
    id: number;
    registeredDate: string;
    firstName: string;
    lastName: string;
    doctor: number;
    doctorDetail: Doctor;
    doctorFullName: string;
    addresses: Address[];
}