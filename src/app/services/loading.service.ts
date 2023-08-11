import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor() { }

  loading$ = new BehaviorSubject<any>(false);

  showLoader(){
    this.loading$.next(true);
  }

  hideLoader(){
    this.loading$.next(false);
  }
}
