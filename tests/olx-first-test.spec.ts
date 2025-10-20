import { test, expect } from '@playwright/test'
import { HomePage } from '../pages/HomePage'
import { AssertionsPage } from '../assertions/OlxAssertions'

let homePage: HomePage
let assertionsPage: AssertionsPage

test('To find a book in Kyiv', async ({page}) => {
    homePage = new HomePage(page)
    assertionsPage = new AssertionsPage(page)
    
    await homePage.navigate()
    await homePage.search('книга', 'Київ')
    await homePage.districtName.click()
    await assertionsPage.expectResultsCount("Ми знайшли понад 1 000 оголошень")
    const count = await homePage.countResultsInCity('Київ')

    console.log("Кількість книг у Києві: " + count)
    assertionsPage.expectCountOfBooks(count)
  })