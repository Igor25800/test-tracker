import {Component, Input} from '@angular/core';
import {
  TransactionCategory,
  transactionFormData,
  TransactionType
} from '../../shared/interfaces/transaction-form-data .interface';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';
import {MatFormField, MatLabel} from '@angular/material/input';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';

@Component({
  selector: 'app-filter-transaction',
  imports: [
    ReactiveFormsModule,
    NgForOf,
    MatFormField,
    MatLabel,
    MatFormField,
    MatOption,
    MatSelect
  ],
  templateUrl: './filter-transaction.component.html',
  standalone: true,
  styleUrl: './filter-transaction.component.scss'
})
export class FilterTransactionComponent {
  @Input() filterForm!: FormGroup;
  @Input() arrayTransaction: transactionFormData[] = [];
  transactionTypes = Object.values(TransactionType);
  categories = Object.values(TransactionCategory);
}
