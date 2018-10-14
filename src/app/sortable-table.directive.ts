import { Directive, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SortService } from './sort.service';

@Directive({
  selector: '[appSortableTable]'
})
export class SortableTableDirective implements OnInit, OnDestroy {

  constructor(private sortService: SortService) { }

  @Output()
  sorted = new EventEmitter();

  private columnSortedSubscription: Subscription;

  ngOnInit() {
    this.columnSortedSubscription = this.sortService.columnSorted$.subscribe(event => {
      this.sorted.emit(event);
    });
  }

  ngOnDestroy() {
    this.columnSortedSubscription.unsubscribe();
  }
}
