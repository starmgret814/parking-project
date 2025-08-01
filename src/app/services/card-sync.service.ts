import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CardSyncService {
  private heightSubject = new BehaviorSubject<number>(0);
  height$ = this.heightSubject.asObservable();

  setHeight(height: number) {
    this.heightSubject.next(height);
  }
}
