import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShareService {
  private refreshSource = new BehaviorSubject<boolean>(false);
  refresh$ = this.refreshSource.asObservable();

  constructor() {}

  triggerRefresh(): void {
    this.refreshSource.next(true);
  }
}
