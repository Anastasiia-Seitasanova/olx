import { Page, Locator, expect } from '@playwright/test'
import { time } from 'console'

export class PhonePage {
    readonly page: Page
    readonly searchInput: Locator
    readonly locationInput: Locator
    readonly recomendationList: Locator
    readonly iPhone16: Locator
    readonly searchButton: Locator 
    readonly suggestionList: Locator
    readonly categoryInput: Locator
    readonly categoryes_suggestion: Locator
    readonly conditionInput: Locator
    readonly newCondition: Locator

    constructor(page: Page) {      
        this.page = page;
        this.searchInput = page.locator('//input[@data-testid="search-input"]')
        this.recomendationList = page.getByTestId('flyout-content')
        this.iPhone16 = page.getByTestId('search-suggestion-item').nth(1)
        this.locationInput = page.getByTestId('location-search-input')
        this.searchButton = page.getByTestId('search-input')
        this.categoryInput = page.locator('//div[@data-testid="category-filter-level-3"]//div[@role="button"]')
        this.conditionInput = page.getByTestId('multi-select-filter').filter({ hasText: 'Стан' }).getByRole('button', { name: /Всі оголошення/i })
        this.categoryes_suggestion = page.locator('//div[@data-cy="category-dropdown-list"]/div[@data-categoryid="85"]')
        this.newCondition = page.locator(`//div[@role='listbox']//p[text()="Вживане"]`)
        this.suggestionList = page.getByTestId('suggestion-list')
}

async fillSearchParameters(phoneName: string, cityName: string) {
    await this.page.waitForTimeout(5000)
    await this.searchInput.fill(phoneName)
    await this.iPhone16.click();
    await this.page.waitForTimeout(5000)
    await this.locationInput.fill(cityName)
    const firstSuggestion = this.suggestionList.getByText('Полтавська область');
    await firstSuggestion.click()
    await this.page.waitForTimeout(5000)
    await this.searchButton.click()
}

async selectFilters(category: string) {
    await this.categoryInput.click({ timeout: 5000 })
    await this.categoryes_suggestion.click()
}

async chooseListBox()  {
    await this.conditionInput.click()
    await this.newCondition.getByText("Вживане").check()
}

async screenOfPage() {
    const dir = 'screenshots';
    await this.page.screenshot({ fullPage: true });
}
}