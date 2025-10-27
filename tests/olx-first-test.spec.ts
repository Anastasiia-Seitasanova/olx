import { test } from '@playwright/test'
import { HomePage } from '../pages/HomePage'
import { OlxAssertionsPage } from '../assertions/OlxAssertions'

test('To find a book in Kyiv', async ({page}) => {
    const homePage = new HomePage(page)
    const assertionsPage = new OlxAssertionsPage(page)
    
    await homePage.navigate()
    await homePage.search('книга', 'Київ')
    await homePage.districtName.click()
    await assertionsPage.expectResultsCount("Ми знайшли понад 1 000 оголошень")
    const count = await homePage.countResultsInCity('Київ')

    assertionsPage.expectCountOfBooks(count)
  })