import {Component, OnInit} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialog
} from '@angular/material/dialog';
import {TransactionModalComponent} from '../../components/transaction-modal/transaction-modal.component';
import {TransactionTableComponent} from '../../components/transaction-table/transaction-table.component';
import {transactionFormData} from '../../shared/interfaces/transaction-form-data .interface';
import {LocalStorageService} from '../../shared/services/local-storage.service';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {FilterTransactionComponent} from '../../components/filter-transaction/filter-transaction.component';
import {filter} from 'rxjs';

@Component({
  selector: 'app-money-tracker',
  templateUrl: './money-tracker.component.html',
  imports: [
    MatButtonModule,
    TransactionTableComponent,
    ReactiveFormsModule,
    FilterTransactionComponent,
  ],
  standalone: true,
  styleUrl: './money-tracker.component.scss',
})
export class MoneyTrackerComponent implements OnInit {
  counter = 0;
  arrayTransaction: transactionFormData[] = [];
  filterForm = new FormGroup({
    transactionType: new FormControl(''),
    category: new FormControl(''),
  });

  constructor(
    private _dialog: MatDialog,
    private _localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this._getTransaction();
  }

  openDialog(): void {
    const dialogRef = this._dialog.open(TransactionModalComponent, {
      width: '50%',
    });
    dialogRef.afterClosed().pipe(
      filter(res => res)
    ).subscribe((res: transactionFormData) => {
      this.arrayTransaction = [...this.arrayTransaction, res];
      this.counter = this._calculateBalance(this.arrayTransaction);
      this._localStorageService.setLocalStore(this.arrayTransaction);
    })
  }

  changeCounterFilter(value: transactionFormData[]): void {
    this.counter = this._calculateBalance(value);
  }

  private _calculateBalance(transactions: transactionFormData[]): number {
    return +transactions.reduce((total: number, transaction: transactionFormData) => {
      const amount = +transaction.amount;
      return transaction.transactionType === 'income'
        ? total + amount
        : total - amount;
    }, 0)?.toFixed(2);
  }

  private _getTransaction(): void {
    this.arrayTransaction = this._localStorageService.getLocalStore();
    this.counter = this._calculateBalance(this.arrayTransaction);
  }
}
