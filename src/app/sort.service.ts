import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SortService {
  propName: string;
  sortDirection: SortDirectionEnum;

  constructor() { }

  private columnSortedSource = new Subject<ColumnSortedEvent>();

  columnSorted$ = this.columnSortedSource.asObservable();

  columnSorted(event: ColumnSortedEvent) {
    this.columnSortedSource.next(event);
  }

  // TODO error handling if the prop type is not matching
  sortObjectWithPropName(propName: string, sortDirection: SortDirectionEnum, objArray: object[]): object[] {
    this.propName = propName;
    this.sortDirection = sortDirection;
    const value1 = objArray[0][propName];
    const type1 = typeof value1;

    switch (type1) {
      case 'number':
        return objArray.sort(this.sortNumber.bind(this));
      case 'string':
        const date1 = new Date(value1);
        if (date1 instanceof Date && date1.toString() !== 'Invalid Date') {
          return objArray.sort(this.sortDate.bind(this));
        } else {
          return objArray.sort(this.sortString.bind(this));
        }
      default:
        return objArray;
    }
  }

  private sortNumber(a: object, b: object): number {
    let order = a[this.propName] - b[this.propName];
    order = this.reverseOrderIfDesc(order);
    return order;
  }

  private sortString(value1: object, value2: object): number {
    let order = 0;
    const a = value1[this.propName].toUpperCase(); // ignore upper and lowercase
    const b = value2[this.propName].toUpperCase(); // ignore upper and lowercase
    if (a < b) {
      order = -1;
    }
    if (a > b) {
      order = 1;
    }
    order = this.reverseOrderIfDesc(order);
    return order;
  }

  private sortDate(a: object, b: object): number {
    let order = 0;
    const date1 = new Date(a[this.propName]);
    const date2 = new Date(b[this.propName]);

    if (date1 < date2) {
      order = -1;
    }
    if (date1 > date2) {
      order = 1;
    }
    order = this.reverseOrderIfDesc(order);
    return order;
  }

  private reverseOrderIfDesc(order: number): number {
    if (this.sortDirection === SortDirectionEnum.DESC) { order *= -1; }
    return order;
  }
}

export interface ColumnSortedEvent {
    sortColumn: string;
    sortDirection: SortDirectionEnum;
}

export enum SortDirectionEnum {
  ASC = 1,
  DESC,
}
