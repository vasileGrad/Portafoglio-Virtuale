import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  public coin$ = new BehaviorSubject<string[]>(undefined);

  constructor() { }

  public getCoin(): Observable<string[]> {
    return this.coin$.asObservable();
  }
}
