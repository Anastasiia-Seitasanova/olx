import {Page, Locator, expect} from '@playwright/test'

export class HomePage {
  readonly page: Page
  readonly viewAllButton: Locator
  readonly categoryFilter: Locator
  readonly searchInput: Locator 
  readonly locationInput: Locator 
  readonly searchButton: Locator 
  readonly suggestionList: Locator 
  readonly districtName: Locator 
  readonly resultMessage: Locator 
  readonly resultItems: Locator 
  
  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.getByTestId('search-input');
    this.locationInput = page.getByTestId('location-search-input');
    this.suggestionList = page.locator('.css-yz55v6');
    this.districtName = page.locator('.css-17rwwbl')
    this.searchButton = page.getByTestId('search-submit');
    this.resultMessage = page.getByTestId('listing-count-msg');
    this.resultItems = page.getByTestId('location-date');
    this.viewAllButton = this.page.locator('text=Переглянути всі оголошення');
    this.categoryFilter = this.page.getByTestId('category-dropdown')
  }

  async navigate() {
    await this.page.goto('https://www.olx.ua/uk/');
  }
categoryButton(sectionList: string): Locator {
    return this.page.locator(`//p[text()="${sectionList}"]/ancestor::a`);
  }
  async clickCategoryButton(sectionList: string): Promise<void> {
    await this.categoryButton(sectionList).click()
  }

async clickViewAll(): Promise<void> {
    await this.viewAllButton.click({ timeout: 10000 });
  }

  async getCategoryText(): Promise<string> {
    await this.page.waitForTimeout(2000)
    return await this.categoryFilter.textContent() || '';
  }

  async search(query: string, location: string) {
    await this.searchInput.fill(query);
    await this.locationInput.click();
    await this.locationInput.fill(location);
    await this.suggestionList.first().waitFor({ state: 'visible', timeout: 10000 })
    const targetDistrict = this.suggestionList.filter({ hasText: 'Київ, Голосіївський' }).first();
    await targetDistrict  .click();
    await this.searchButton.click();
  }

  async countResultsInCity(city: string) {
    if (!this.resultItems) {
      throw new Error('resultItems is undefined');
    }
    const items = await this.resultItems.allTextContents();
    const cityItems = items.filter(text => text.includes(city));
    return cityItems.length;
  }
}