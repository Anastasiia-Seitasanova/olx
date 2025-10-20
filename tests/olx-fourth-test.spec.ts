import { test, expect } from '@playwright/test'
import { HomePage } from '../pages/HomePage'
import { OlxAssertionsPage } from '../assertions/OlxAssertions'
import { PhonePage } from '../pages/PhonePage'

let homePage: HomePage
let assertionsPage: OlxAssertionsPage
let phonePage: PhonePage

test('Searching of an iPhone in Poltava', async ({ page }) => {
      homePage = new HomePage(page)
      assertionsPage = new OlxAssertionsPage(page)
      phonePage = new PhonePage(page)
      
      await homePage.navigate()
      await homePage.choseElectronicsSection()
      await homePage.chosePhonesSubsection()
      await phonePage.fillSearchParameters('iPhone 16', 'Полтава')
      await phonePage.selectFilters('Смартфони / мобільні телефони')
      await assertionsPage.expectCategoryAndLocation()
      await assertionsPage.expectedCount('Ми знайшли 3 оголошення')
      await phonePage.selectOnePhone()
      await assertionsPage.expectPrice()
      await phonePage.screenOfPage()
})