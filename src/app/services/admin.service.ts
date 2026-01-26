import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private sidebarCollapsedSubject = new BehaviorSubject<boolean>(false);
  public sidebarCollapsed$ = this.sidebarCollapsedSubject.asObservable();

  toggleSidebar(): void {
    const currentValue = this.sidebarCollapsedSubject.value;
    this.sidebarCollapsedSubject.next(!currentValue);
  }

  collapseSidebar(): void {
    this.sidebarCollapsedSubject.next(true);
  }

  expandSidebar(): void {
    this.sidebarCollapsedSubject.next(false);
  }

  isSidebarCollapsed(): boolean {
    return this.sidebarCollapsedSubject.value;
  }
}
