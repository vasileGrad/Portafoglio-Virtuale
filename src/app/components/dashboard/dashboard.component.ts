import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private obs = fromEvent(document.body, 'click');

  constructor() { }

  ngOnInit(): void {
    this.obs.subscribe((item: any) => {
      console.log({x: item.x, y: item.y });
    });
  }

}
