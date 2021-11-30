import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  @Input() coins: any;

  favorites: Array<any> = [];

  favoriteIds = [
    "bitcoin", "solana", "chainlink"
  ];

  myCoins: any = {
    "bitcoin": 2,
    "solana": 3,
    "chainlink": 5
  }

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.setFavorites();
    console.log("FAVORITES COMPONENT CHANGED");
  }

  setFavorites() {
    this.favorites = this.coins.filter(
      (coin: any) => 
      this.favoriteIds.includes(coin.id)
    );
    this.favorites.forEach((favorite) => {
      favorite.my_currency = this.myCoins[favorite.id] * favorite.current_price;
    });
  }
}
