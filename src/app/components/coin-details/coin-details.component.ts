import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { CoinInfo } from 'src/app/models/CoinInfo';
import { CoinsService } from 'src/app/services/coins.service';

@Component({
  selector: 'app-coin-details',
  templateUrl: './coin-details.component.html',
  styleUrls: ['./coin-details.component.css']
})
export class CoinDetailsComponent implements OnInit {

  displayedColumns: string[] = ['info', 'image', 'name', 'current_price', 'symbol', 'last_date'];
  dataSource = new MatTableDataSource<CoinInfo>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private coinService: CoinsService) { }

  ngOnInit(): void {
    this.coinService.getCoins().subscribe((data: CoinInfo[]) => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
