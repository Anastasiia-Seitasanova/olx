import { Page, Locator, expect } from '@playwright/test'

export class PhonePage {
    readonly page: Page
    readonly searchInput: Locator
    readonly locationInput: Locator
    readonly suggestionList: Locator
    readonly categoryInput: Locator
    readonly categoryes_suggestion: Locator
    readonly conditionInput: Locator
    readonly newCondition: Locator
    readonly onePhone: Locator

    constructor(page: Page) {      
      this.page = page;
        this.searchInput = page.locator('//input[@data-testid="search-input"]')
        this.locationInput = page.getByTestId('location-search-input')
        this.categoryInput = page.locator('//div[@data-testid="category-filter-level-3"]//div[@role="button"]')
        this.conditionInput = page.locator('//div[@data-testid="multi-select-filter"]//span[text() ="Стан"]')
        this.categoryes_suggestion = page.locator('//div[@data-cy="category-dropdown-list"]/div[@data-categoryid="85"]')
        this.newCondition = page.locator('multi-select-body css-kmbafq')
        this.suggestionList = page.getByTestId('suggestion-list')
        this.onePhone = page.locator('//div[@data-testid="l-card"]//a[@href="/d/uk/obyavlenie/apple-iphone-16-128gb-black-noviy-zapakovaniy-IDZ8Y7R.html"]/h4')//.getByText("Apple iPhone 16 128GB (Black) Новий! Запакований")
}

async fillSearchParameters(phoneName: string, cityName: string) {
    await this.searchInput.fill(phoneName)
    await this.locationInput.fill(cityName)
   const firstSuggestion = this.suggestionList.getByText('Полтавська область')
   await firstSuggestion.waitFor({ state: 'visible', timeout: 5000 })
   await firstSuggestion.click()
}

async selectFilters(category: string) {
    await this.categoryInput.click({ timeout: 5000 })
    await this.categoryes_suggestion.click()
    await this.conditionInput.click({ timeout: 5000 })
    await this.newCondition.nth(3)//.check
}

async selectOnePhone() {
    await this.onePhone.click() 
}
async screenOfPage() {
    const dir = 'screenshots';
    await this.page.screenshot({ fullPage: true });
}

}