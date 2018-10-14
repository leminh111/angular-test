import { Component, OnInit, Input, OnDestroy, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { SortService } from '../sort.service';
import { SortDirectionEnum } from "../sort.service";

@Component({
  selector: '[app-sortable-column]',
  templateUrl: './sortable-column.component.html'
})
export class SortableColumnComponent implements OnInit, OnDestroy {

  constructor(private sortService: SortService) { }

  @Input('app-sortable-column')
  columnName: string;

  @Input('sort-direction')
  sortDirection: SortDirectionEnum = SortDirectionEnum.ASC;

  private columnSortedSubscription: Subscription;

  @HostListener('click')
  sort() {
    this.sortDirection = this.sortDirection === SortDirectionEnum.ASC ? SortDirectionEnum.DESC : SortDirectionEnum.ASC;
    this.sortService.columnSorted({ sortColumn: this.columnName, sortDirection: this.sortDirection });
  }

  ngOnInit() {
    // subscribe to sort changes so we can react when other columns are sorted
    this.columnSortedSubscription = this.sortService.columnSorted$.subscribe(event => {
      // reset this column's sort direction to hide the sort icons
      if (this.columnName !== event.sortColumn) {
        this.sortDirection = SortDirectionEnum.ASC;
      }
    });
  }

  ngOnDestroy() {
    this.columnSortedSubscription.unsubscribe();
  }
}
