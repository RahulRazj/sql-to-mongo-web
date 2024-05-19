import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { THEME_MODE } from '../../../models/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  dayThemeSelected!: boolean;
  currentThemeMode: THEME_MODE = THEME_MODE.DARK;

  @Output() themeToggleEvent = new EventEmitter();
  constructor(private router: Router, private themeService: ThemeService) {}

  ngOnInit() {
    this.themeService.themeModeChanged$().subscribe((mode) => {
      this.currentThemeMode = mode;
      this.dayThemeSelected = mode === THEME_MODE.LIGHT;
    });
  }

  toggleThemeMode() {
    this.themeToggleEvent.emit();
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }
}
