import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { CoinInfo } from 'src/app/models/CoinInfo';
import { CoinsService } from 'src/app/services/coins.service';
import { ShareDataService } from 'src/app/services/share-data.service';

@Component({
  selector: 'app-coin-details',
  templateUrl: './coin-details.component.html',
  styleUrls: ['./coin-details.component.css']
})
export class CoinDetailsComponent implements OnInit {

  displayedColumns: string[] = ['info', 'image', 'name', 'current_price', 'symbol', 'last_date', 'favorites'];
  dataSource = new MatTableDataSource<CoinInfo>();
  public selectedCoin: CoinInfo;

  public favoritesSet = new Set<string>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private coinService: CoinsService, private sharedData: ShareDataService) { }

  ngOnInit(): void {
    this.coinService.getCoins().subscribe((data: CoinInfo[]) => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public setFavorite(element: CoinInfo):void {
    if(this.favoritesSet.has(element.id)) {
      this.favoritesSet.delete(element.id);
    } else {
      this.favoritesSet.add(element.id);
    }

    this.sharedData.coin$.next([...this.favoritesSet]);
  }

  public setSelectedCoin(coin: CoinInfo) {
    this.selectedCoin = coin;
  }
}
