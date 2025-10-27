import { test } from '@playwright/test'
import { HomePage } from '../pages/HomePage'
import { OlxAssertionsPage } from '../assertions/OlxAssertions'

const sectionList = [
'Допомога', 
'Дитячий світ', 
'Нерухомість', 
'Авто', 
'Запчастини', 
'Робота', 
'Тварини', 
'Дім і сад', 
'Електроніка', 
'Бізнес та послуги',
'Житло подобово',
'Оренда і прокат',
'Мода і стиль',
'Хобі, відпочинок і спорт',
'Віддам безкоштовно',
'Обмін',
'Товари для геймерів',
'Все про OLX для бізнесу',
'Шини, Диски та Колеса']

  for (const section of sectionList) {
test(`Go through section ${section} `, async ({ page }) => {
  const homePage = new HomePage(page)
  const assertionsPage = new OlxAssertionsPage(page)

  await homePage.navigate()

    await homePage.clickCategoryButton(section);
    await homePage.clickViewAll();

    await homePage.getCategoryText()
    await assertionsPage.getAndAssertCategoryText()
})
}
