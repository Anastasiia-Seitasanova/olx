import { test, expect, Locator, Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { FilterPage } from '../pages/FilterPage'

let homePage: HomePage;
let filterPage: FilterPage;

test('To find a car', async ({ page }) => {
  homePage = new HomePage(page);
  filterPage = new FilterPage(page);

  await homePage.navigate();
  await filterPage.openCarsCategory();
  await filterPage.checkPhotosOnly()  // Чекбокс "тільки з фото"
  await filterPage.setPriceRange('100 000', '2 000 000')
  await filterPage.openFilter('Тип автомобіля');
  await filterPage.selectFilterOption('З пробігом');
  await filterPage.setYearFrom('2 016');
  await filterPage.setYearTo('2 022');
  await filterPage.setTypeOfSale('Звичайний продаж');
  await filterPage.setMileageFrom('50 тис.км');// Пробіг від
  await filterPage.setMileageTo('200 тис.км');
  await filterPage.expectResultsCount('Ми знайшли понад 1 000 оголошень');
})