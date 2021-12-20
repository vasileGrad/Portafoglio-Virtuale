import { Component, OnInit } from '@angular/core';
import { ShareDataService } from 'src/app/services/share-data.service';

@Component({
  selector: 'app-current-currency',
  templateUrl: './current-currency.component.html',
  styleUrls: ['./current-currency.component.css']
})
export class CurrentCurrencyComponent implements OnInit {

  constructor(private shareData: ShareDataService) { }

  ngOnInit(): void {
  }

  addMoneyToWallet(el: any) {
    const money = +el.value;
    this.shareData.addBudget(money);
    el.value = 0;
  }

}
