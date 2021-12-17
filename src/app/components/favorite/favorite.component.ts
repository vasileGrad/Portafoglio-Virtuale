import { Component, Input, OnInit } from '@angular/core';
import { CoinInfo } from 'src/app/models/CoinInfo';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
  @Input() coin!: CoinInfo;

  constructor() { }

  ngOnInit(): void {
  }

}
