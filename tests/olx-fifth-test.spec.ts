import {test } from '@playwright/test'
import { HomePage } from '../pages/HomePage'
import { FilterPage } from '../pages/FilterPage'
import { OlxAssertionsPage } from '../assertions/OlxAssertions'


let homePage: HomePage
let assertionsPage: OlxAssertionsPage
let filterPage: FilterPage

test('Searching for a bicycle with a photo', async ({ page }) => {
  homePage = new HomePage(page)
  assertionsPage = new OlxAssertionsPage(page)
  filterPage = new FilterPage(page)

  await homePage.navigate()
  await homePage.searchOfABicycle('велосипед')
  await filterPage.checkPhotosOnly()
  await filterPage.setPriceBicycle('10 000', '100 000')
  await assertionsPage.expectBicycleResults('Велосипед')
})