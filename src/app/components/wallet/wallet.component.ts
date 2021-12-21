import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CoinInfo } from 'src/app/models/CoinInfo';
import { CoinsService } from 'src/app/services/coins.service';
import { ShareDataService } from 'src/app/services/share-data.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css'],
})
export class WalletComponent implements OnInit {
  public coinId: string[];
  public status: number;
  public budget: number;
  public coins$: Observable<CoinInfo[]>;
  public selectedCoin: CoinInfo;
  public totalCost: number = 0;
  public overPrice: boolean = false;
  public amount: any;

  constructor(
    private sharedData: ShareDataService,
    private coinService: CoinsService
  ) {}

  ngOnInit(): void {
    this.sharedData.getBudget().subscribe((currentBudget) => {
      this.status = +currentBudget.toFixed(2);
      this.budget = +currentBudget.toFixed(2);
    });
    this.coins$ = this.coinService.getCoins();
  }

  calculateTotalPrice(evt: any): void {
    this.amount = +evt.value;
    this.totalCost = this.selectedCoin.current_price * +this.amount;
    this.overPrice = this.totalCost > this.budget;
  }

  buyCoins() {
    this.performAction("BUY");
  }
  
  sellCoins() {
    this.performAction('SELL');
  }

  performAction(type: string) {
    this.sharedData.createTransaction(this.selectedCoin, this.amount, this.totalCost, type);
    this.sharedData.calculateBudget(this.totalCost, type);
    this.resetValues();
  }

  resetValues(): void {
    this.totalCost = 0;
    this.overPrice = false;
    this.amount = '';
  }
}
