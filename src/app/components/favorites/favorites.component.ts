import { Component, Input, OnInit } from '@angular/core';
import { CoinInfo } from 'src/app/models/CoinInfo';
import { ShareDataService } from 'src/app/services/share-data.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  @Input() coins: CoinInfo[] = [];

  favorites: CoinInfo[] = [];

  favoriteIds: string[] = [
    "bitcoin", "solana", "chainlink"
  ];

  myCoins: { [key: string]: number } = {
    "bitcoin": 2,
    "solana": 3,
    "chainlink": 5
  }

  constructor(private sharedData: ShareDataService) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.setFavorites();
  }

  setFavorites() {
    this.sharedData.getCoin().subscribe(coinId => {
      this.favorites = this.coins.filter((coin: CoinInfo) => coin.id === coinId);
      this.favorites.forEach((favorite) => {
        favorite.my_currency = this.myCoins[favorite.id] * favorite.current_price;
      });
    })
  }
}
