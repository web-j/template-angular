import { OverlayContainer } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkTheme = new Subject<boolean>();
  isDarkTheme = this.darkTheme.asObservable();

  constructor(private overlayContainer: OverlayContainer) { }

  setDarkTheme(isDarkTheme: boolean): void {
    this.darkTheme.next(isDarkTheme);
    if (isDarkTheme) {
      this.overlayContainer.getContainerElement().classList.add('unicorn-dark-theme');
    } else {
      this.overlayContainer.getContainerElement().classList.add('unicorn-light-theme');

    }
  }
}
