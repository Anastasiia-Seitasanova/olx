import { test, expect } from '@playwright/test'
import { HomePage } from '../pages/HomePage'

let homePage: HomePage

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
  homePage = new HomePage(page)
  await homePage.navigate()

    await homePage.clickCategoryButton(section);
    await homePage.clickViewAll();

    const categoryText = await homePage.getCategoryText()
    expect(categoryText.trim()).toBe(section);
})
}
