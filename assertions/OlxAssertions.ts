import { expect, Page, Locator } from '@playwright/test'

export class OlxAssertionsPage {
    readonly result: Locator
    readonly filtersResult: Locator
    readonly priceContainer: Locator
    readonly listOfBicycles: Locator

constructor(page: Page) {
    this.result = page.getByTestId('total-count')
this.filtersResult = page.locator('//h1[@data-testid="heading"]')
this.priceContainer = page.getByTestId('ad-price-container')
this.listOfBicycles = page.getByTestId('listing-grid')
}
//1 тест
async expectCountOfBooks(value: number) {
  expect(value).toBeGreaterThan(0)
}
//2 тест
async getAndAssertCategoryText() {
    const text = await this.result.textContent();
    expect(text?.trim().length).toBeGreaterThan(0);
    return text?.trim();
}
//3 тест
async expectResultsCount(expectedText: string) {
    await expect(this.result).toContainText(expectedText)
  }
  //4 тест
async expectCategoryAndLocation() {
  await expect(this.filtersResult).toContainText(
         "IPhone 16 Pro Max Полтава",{ timeout: 15000 })
}
async expectedCount(expectedText: string) {
    await expect(this.result).toContainText(expectedText)
  }

// 5 тест 
async expectBicycleResults(expectedText: string) {
    await expect(this.listOfBicycles).toContainText(expectedText)
    await console.log('Всі результати містять слово Велосипед')
  }
  }