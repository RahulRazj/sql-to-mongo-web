import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { THEME_MODE } from '../../models/constants';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private themeModeSubject = new BehaviorSubject<THEME_MODE>(THEME_MODE.LIGHT);

  currentThemeMode = localStorage.getItem('preferredTheme') || THEME_MODE.DARK;
  constructor(@Inject(DOCUMENT) private document: Document) {
    this.document.body.classList.toggle(this.currentThemeMode);
    this.setThemeMode(this.currentThemeMode as THEME_MODE);
  }

  themeModeChanged$() {
    return this.themeModeSubject.asObservable();
  }

  setThemeMode(mode: THEME_MODE) {
    this.themeModeSubject.next(mode);
    localStorage.setItem('preferredTheme', mode);
  }

  toggleThemeMode() {
    this.document.body.classList.toggle(THEME_MODE.LIGHT);
    this.document.body.classList.toggle(THEME_MODE.DARK);
    if (this.currentThemeMode === THEME_MODE.LIGHT) {
      this.updateCurrentMode(THEME_MODE.DARK);
    } else {
      this.updateCurrentMode(THEME_MODE.LIGHT);
    }
  }

  updateCurrentMode(mode: THEME_MODE) {
    this.currentThemeMode = mode;
    this.setThemeMode(mode);
  }
}
