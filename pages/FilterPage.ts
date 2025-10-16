import {Page, Locator, expect} from '@playwright/test'

export class FilterPage {
  readonly page: Page
  readonly category: Locator
  readonly subcategory: Locator
  readonly photosCheckbox: Locator
  readonly priceFromInput: Locator
  readonly priceToInput: Locator
  readonly yearFromInput: Locator 
  readonly yearToInput: Locator
  readonly typeOfSaleInput: Locator
  readonly mileageFromInput: Locator
  readonly mileageToInput: Locator

  constructor(page: Page) {
    this.page = page;
    this.category = page.getByText('Авто')
    this.subcategory = page.locator('.css-rbcfn3')
    this.photosCheckbox = page.locator('#photos')
    this.priceFromInput = page.getByTestId('range-from-input').first()
    this.priceToInput = page.getByTestId('range-to-input').first()
this.yearFromInput = page.getByTestId('range-from-input').nth(1)
this.yearToInput = page.getByTestId('range-to-input').nth(1)
//this.typeOfSaleInput = page.getByTestId('range-from-input').nth(2)
this.mileageToInput = page.getByTestId('range-to-input').nth(2)
this.mileageFromInput = page.getByTestId('range-from-input').nth(2)

this.typeOfSaleInput = page.getByTestId('flyout-toggle').filter({ hasText: 'Умови продажу' }).first()
}

  async openCarsCategory() {
    await this.page.click('text=Авто');
    await this.page.click('.css-rbcfn3'); 
  }
async checkPhotosOnly() {
  await this.photosCheckbox.check();
}
  async setPriceRange(from: string, to: string) {
  await this.priceFromInput.click();
  await this.page.getByTestId('from-value-container').getByText(from).click();
  await this.priceToInput.click();
  await this.page.getByText(to).click();
}
async openFilter(filterText: string) {
  const filter = this.page.locator('.css-95hdyi', { hasText: filterText }).first();
  await filter.scrollIntoViewIfNeeded();
  await filter.click();
}

  async selectFilterOption(optionText: string) {
  const option = this.page.locator('div', { hasText: optionText }).first(); 
  await option.scrollIntoViewIfNeeded(); 
  await option.waitFor({ state: 'visible', timeout: 5000 }); 
  await option.click();
}

async setYearFrom(value: string) {
    await this.yearFromInput.click();
    await this.page.getByTestId('from-value-container').getByText(value).click();
  }
  async setYearTo(value: string) {
    await this.yearToInput.click();
    await this.page.getByText(value).click();
  }

  async setTypeOfSale(value: string) {
    await this.typeOfSaleInput.click();
    await this.page.getByText(value).click();
  }

  async setMileageFrom(value: string) {
    await this.mileageFromInput.click();
    await this.page.getByTestId('from-value-container').getByText(value).click();
  }
  async setMileageTo(value: string) {
    await this.mileageToInput.click();
    await this.page.getByText(value).click();
  }
  async expectResultsCount(expectedText: string) {
    await expect(this.page.getByTestId('total-count')).toContainText(expectedText);
  }
}