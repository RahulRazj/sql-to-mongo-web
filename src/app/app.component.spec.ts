import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ThemeService } from './services/theme.service';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule],
    declarations: [AppComponent]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should toggle theme', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const themeService = fixture.debugElement.injector.get(ThemeService);
    const spyThemeToggle = jest.spyOn(themeService, 'toggleThemeMode');
    app.toggleTheme();
    expect(spyThemeToggle).toHaveBeenCalled();
  })
});
