import { Injectable } from '@angular/core';
import {transactionFormData} from '../interfaces/transaction-form-data .interface';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getLocalStore(): transactionFormData[] {
    if (typeof window !== 'undefined' && localStorage) {
      return JSON.parse(localStorage.getItem('transactionFormData') || '[]');
    }
    return [];
  }

  setLocalStore (newCache: transactionFormData[]): void  {
    localStorage.setItem('transactionFormData', JSON.stringify(newCache));
  }
}
