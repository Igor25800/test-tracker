import {
  AfterViewInit,
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatSort, MatSortModule, Sort} from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {transactionFormData} from '../../shared/interfaces/transaction-form-data .interface';
import {DatePipe} from '@angular/common';
import {FormGroup, FormsModule} from '@angular/forms';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-transaction-table',
  imports: [MatTableModule, MatSortModule, DatePipe, FormsModule],
  templateUrl: './transaction-table.component.html',
  standalone: true,
  styleUrl: './transaction-table.component.scss'
})
export class TransactionTableComponent implements AfterViewInit, OnChanges  {
  @Input() arrayTransaction: transactionFormData[] = [];
  @Input() filterForm!: FormGroup;
  @Output() changeCounterFilter = new EventEmitter<transactionFormData[]>();
  displayedColumns: string[] = ['name', 'amount', 'category', 'date'];
  dataSource = new MatTableDataSource<transactionFormData>();
  @ViewChild(MatSort) sort!: MatSort;
  private _destroyRef = inject(DestroyRef);

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['arrayTransaction']) {
      this.dataSource.data = this.arrayTransaction;
    }
  }

  ngAfterViewInit(): void {
    this._sortDate();
    this._filter();
  }

  announceSortChange(sortState: Sort) {
    const direction = sortState.direction;
    const sort = ['asc', 'desc'];

    if (sort.includes(direction)) {
      const message = `Sorted ${direction}ending`;
      this._liveAnnouncer.announce(message);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  private _sortDate(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item: any, property: string) => {
      if (property === 'date') {
        return new Date(item.date);
      }
      return item[property];
    };
  }

  private _filter() : void {
    const filterArray = this.dataSource.filterPredicate = (data: transactionFormData, filter: string) => {
      const filterObj = JSON.parse(filter);
      const matchType = filterObj.transactionType ? data.transactionType === filterObj.transactionType : true;
      const matchCategory = filterObj.category ? data.category === filterObj.category : true;
      return matchType && matchCategory;
    };
    this.filterForm.valueChanges.pipe(
      takeUntilDestroyed(this._destroyRef)
    ).subscribe(value => {
      this._applyFilter(value);
      this.changeCounterFilter.emit(this.dataSource.filteredData);
    });
  }

  private _applyFilter(value: { transactionType: string; category: string }): void {
    this.dataSource.filter = JSON.stringify(value);
  }
}
