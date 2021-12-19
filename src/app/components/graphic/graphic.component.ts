import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ChartData } from 'src/app/models/ChartData';
import { CoinsService } from 'src/app/services/coins.service';
import { ShareDataService } from 'src/app/services/share-data.service';

@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GraphicComponent implements OnInit {
  public hours: string[] = [];
  public coinValues: number[] = [];
  public updateOptions: any;

  public options: any = {
    legend: {
      data: ['Prices', 'Market Cap'],
      align: 'left',
    },
    tooltip: {},
    xAxis: {
      data: this.hours,
      silent: false,
      splitLine: {
        show: false,
      },
    },
    yAxis: {},
    series: [
      {
        name: 'Prices',
        type: 'bar',
        data: this.coinValues,
        animationDelay: (idx: number) => idx * 10,
      }
    ],
    animationEasing: 'elasticOut',
    animationDelayUpdate: (idx: number) => idx * 5,
  };

  constructor(
    private sharedData: ShareDataService,
    private coinService: CoinsService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.sharedData
      .getSelectedCoin()
      .pipe(switchMap(coinId => {
        return this.coinService.getHistoryDataForCoin(coinId);
      })).subscribe((chartData: ChartData) => {
        this.formatChartData(chartData);
        console.log(this.hours);
        this.updateOptions = {
          xAxis: {
            data: this.hours
          },
          yAxis: {
            scale: true
          },
          series: [{
            data: this.coinValues,
          }]
        }
      });
  }

  private formatChartData(chartData: ChartData) {
    this.hours = [];
    this.coinValues = [];

    for (let i = 0; i < chartData.prices.length; i++) {
      const price = chartData.prices[i];
      const priceTime = new Date(price[0]);
      const value = price[1].toFixed(2);

      this.hours.push(priceTime.toLocaleString());
      this.coinValues.push(+value);
    }

    this.cdr.markForCheck();
  }
}
