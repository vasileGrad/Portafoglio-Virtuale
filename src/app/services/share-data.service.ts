import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CoinInfo } from '../models/CoinInfo';
import { Transaction } from '../models/Transaction';
import { TRANSACTIONS } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {
  public coin$ = new BehaviorSubject<string[]>(undefined);
  public selectedCoin$ = new Subject<string>();
  private storageBudget = +localStorage.getItem('budget');
  private budget$ = new BehaviorSubject<number>(this.storageBudget);

  constructor() {}

  public getCoin(): Observable<string[]> {
    return this.coin$.asObservable();
  }

  public getSelectedCoin(): Observable<string> {
    return this.selectedCoin$.asObservable();
  }

  public addBudget(value: number): void {
    this.storageBudget = +localStorage.getItem('budget');
    const currentBudget = this.storageBudget + value;
    localStorage.setItem('budget', currentBudget.toString());
    this.budget$.next(currentBudget);
  }

  public getBudget(): Observable<number> {
    return this.budget$.asObservable();
  }

  public getTransactions(){
    if(localStorage.getItem(TRANSACTIONS)) {
      return JSON.parse(localStorage.getItem(TRANSACTIONS));
    }
    return [];
  }

  public setTransactions(transaction: Transaction) {
    const currentTransactions = this.getTransactions();
    currentTransactions.push(transaction);
    localStorage.setItem(TRANSACTIONS, JSON.stringify(currentTransactions));
  }

  public createTransaction(
    coinInfo: CoinInfo,
    amount: number,
    totalPrice: number,
    type: string
  ) {
    const currentTransaction = this.getTransactions().pop();
    const id = currentTransaction ? currentTransaction.id : 0;
    const newTransaction: Transaction = {
      id: id+1, 
      date: new Date().toLocaleString(),
      type,
      symbol: coinInfo.symbol,
      price: coinInfo.current_price,
      amount,
      totalPrice
    }
    this.setTransactions(newTransaction);
  }

  public calculateBudget(totalCost: number, type: string) {
    let currentBudget = +localStorage.getItem('budget');
    switch (type) {
      case 'BUY':
        currentBudget -= totalCost;
        break;
      default:
        currentBudget += totalCost;
    }
    currentBudget = +currentBudget.toFixed(2);
    localStorage.setItem("budget", currentBudget.toString());
    this.budget$.next(currentBudget);
  }
}
