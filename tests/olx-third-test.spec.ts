import { test, expect, Locator, Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { FilterPage } from '../pages/FilterPage'
import { AssertionsPage } from '../assertions/OlxAssertions.spec'

let homePage: HomePage;
let filterPage: FilterPage;
let assertionsPage: AssertionsPage;

test('To find a car', async ({ page }) => {
  homePage = new HomePage(page)
  filterPage = new FilterPage(page)
  assertionsPage = new AssertionsPage(page)

  await homePage.navigate()
  await filterPage.openCarsCategory()
  await filterPage.checkPhotosOnly()
  await filterPage.setPriceRange('100 000', '2 000 000')
  await filterPage.typeOfCar('З пробігом')
  await filterPage.setYear('2 016','2 022')
  await filterPage.setTypeOfSale('Звичайний продаж')
  await filterPage.setMileage('50 тис.км', '200 тис.км')
  await assertionsPage.expectResultsCount('Ми знайшли понад 1 000 оголошень')
})