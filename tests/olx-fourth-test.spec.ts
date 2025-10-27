import { test } from '@playwright/test'
import { HomePage } from '../pages/HomePage'
import { OlxAssertionsPage } from '../assertions/OlxAssertions'
import { PhonePage } from '../pages/PhonePage'

test('Searching of an iPhone in Poltava', async ({ page }) => {
      const homePage = new HomePage(page)
      const assertionsPage = new OlxAssertionsPage(page)
      const phonePage = new PhonePage(page)

      await homePage.navigate()
      await homePage.choseElectronicsSection()
      await homePage.chosePhonesSubsection()
      await phonePage.fillSearchParameters('iPhone 16', 'Полтава')
      await phonePage.selectFilters('Смартфони / мобільні телефони')
      await phonePage.chooseListBox()
      await assertionsPage.expectCategoryAndLocation()
      await assertionsPage.expectedCount('Ми знайшли 8 оголошень')
})