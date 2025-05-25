import {Component, OnInit} from '@angular/core';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatSelect} from '@angular/material/select';
import {MatOption, provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {
  MatDialogRef,
} from '@angular/material/dialog';
import {NgForOf, NgIf} from '@angular/common';
import {TransactionCategory, TransactionType} from '../../shared/interfaces/transaction-form-data .interface';

@Component({
  selector: 'app-transaction-modal',
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    MatSelect,
    MatSelect,
    MatOption,
    MatDatepickerToggle,
    MatDatepickerInput,
    MatDatepicker,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButton,
    NgIf,
    NgForOf
  ],
  templateUrl: './transaction-modal.component.html',
  standalone: true,
  styleUrl: './transaction-modal.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class TransactionModalComponent implements OnInit {
  formTransaction!: FormGroup;
  transactionTypes = Object.values(TransactionType);
  categories = Object.values(TransactionCategory);

  constructor(
    private dialogRef: MatDialogRef<TransactionModalComponent>
  ) {
  }

  ngOnInit(): void {
    this._getFormTransaction();
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  addTransaction(): void {
    if (this.formTransaction.invalid) {
      this.formTransaction.markAllAsTouched();
      return;
    }
    const {value} = this.formTransaction;
    this.dialogRef.close(value);
  }

  private _getFormTransaction(): void {
    this.formTransaction = new FormGroup({
      name: new FormControl('', Validators.required),
      amount: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d+(\.\d{1,2})?$/)
      ]),
      transactionType: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      date: new FormControl(new Date(), Validators.required),
    });
  }
}
