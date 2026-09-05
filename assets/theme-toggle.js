import { Component } from '@theme/component';

const STORAGE_KEY = 'broetiq:color-mode';

/**
 * Toggles the site between light and dark color mode.
 *
 * Mirrors the inline bootstrap script in snippets/color-mode-init.liquid: both read/write the
 * same `data-color-mode` attribute on <html> and the same localStorage key, so the choice made
 * here is what that script picks up as the stored preference on the next page load.
 */
class ThemeToggle extends Component {
  connectedCallback() {
    super.connectedCallback();
    this.#syncButton();
  }

  toggle() {
    const isDark = document.documentElement.dataset.colorMode === 'dark';
    const next = isDark ? 'light' : 'dark';

    document.documentElement.dataset.colorMode = next;

    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch (error) {
      // localStorage unavailable (e.g. blocked storage) - the preference just won't persist.
    }

    this.#syncButton();
  }

  #syncButton() {
    const isDark = document.documentElement.dataset.colorMode === 'dark';
    this.querySelector('button')?.setAttribute('aria-pressed', String(isDark));
  }
}

if (!customElements.get('theme-toggle')) {
  customElements.define('theme-toggle', ThemeToggle);
}
