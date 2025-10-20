import { expect, Page, Locator } from '@playwright/test'

export class OlxAssertionsPage {
    readonly result: Locator
    readonly filtersResult: Locator
    readonly priceContainer: Locator

constructor(page: Page) {
    this.result = page.getByTestId('total-count')
this.filtersResult = page.locator('//h1[@data-testid="heading"]')
this.priceContainer = page.getByTestId('ad-price-container')

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
         "Смартфони і мобільні телефони Полтава - iPhone 16",{ timeout: 15000 })
}
async expectedCount(expectedText: string) {
    await expect(this.result).toContainText(expectedText)
  }

async expectPrice() {
    const priceText = await this.priceContainer.textContent()
    console.log('Ціна цього айфона:', priceText?.trim())
    await expect(this.priceContainer).toBeVisible({ timeout: 15000 })
  }
}