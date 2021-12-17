import { Component } from '@angular/core';
import { CoinsService } from './services/coins.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Virtual Wallet';
  coins: any = [];

  constructor(private coinsService: CoinsService) { 
  }

  ngOnInit(): void {
    this.getCoinsData();
    setInterval(this.getCoinsData.bind(this), 20000);
    }

  getCoinsData(){
    this.coinsService.getCoins().subscribe((response) => {
      this.coins = response;
    })
  }
}


