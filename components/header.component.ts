import { Locator, Page } from '@playwright/test';

export default class HeaderComponent {
  readonly page: Page;
  readonly logo: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.locator('header a.logo');
  }

  async clickLogo() {
    await this.logo.click();
  }
}
