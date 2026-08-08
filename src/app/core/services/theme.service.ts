import { Injectable, signal, effect } from '@angular/core';

export type Theme = 'dark' | 'light';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  /** Reactive signal holding the current theme. */
  readonly theme = signal<Theme>(this.getInitialTheme());

  constructor() {
    // Sync the signal value to the DOM and localStorage whenever it changes
    effect(() => {
      const currentTheme = this.theme();
      document.body.setAttribute('data-theme', currentTheme);
      localStorage.setItem('theme', currentTheme);
    });
  }

  /** Toggle between dark and light themes. */
  toggleTheme(): void {
    this.theme.update(t => (t === 'dark' ? 'light' : 'dark'));
  }

  /** Read the initial theme from localStorage, defaulting to 'dark'. */
  private getInitialTheme(): Theme {
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
    return 'dark';
  }
}
