import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoinsService {

  constructor() { }

  getCoins(): any {
    return [1, 2, 3];
  }
}
