import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchOverlaySubject = new Subject<boolean>();
  
  // Observable để các component subscribe
  searchOverlay$ = this.searchOverlaySubject.asObservable();

  // Method để mở search overlay
  openSearchOverlay() {
    console.log('📢 SearchService: Broadcasting open event');
    this.searchOverlaySubject.next(true);
  }

  // Method để đóng search overlay
  closeSearchOverlay() {
    this.searchOverlaySubject.next(false);
  }
}
