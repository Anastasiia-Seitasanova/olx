import { test, expect } from '@playwright/test'
import { HomePage } from '../pages/HomePage'

let homePage: HomePage

test('To find a book in Kyiv', async ({page}) => {
    homePage = new HomePage(page)
    await homePage.navigate()

    await homePage.search('книга', 'Київ')
    await homePage.districtName.click()
    await expect(homePage.resultMessage).toHaveText("Ми знайшли понад 1 000 оголошень")
    const count = await homePage.countResultsInCity('Київ')

    console.log("Кількість книг у Києві: " + count)
    expect(count).toBeGreaterThan(0)
  })