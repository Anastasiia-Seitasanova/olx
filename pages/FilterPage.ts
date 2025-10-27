import { Page, Locator, expect } from "@playwright/test";

export class FilterPage {
  readonly page: Page;
  readonly category: Locator;
  readonly subcategory: Locator;
  readonly photosCheckbox: Locator;
  readonly priceFromInput: Locator;
  readonly priceToInput: Locator;
  readonly fromValueContainer: Locator;
  readonly toValueContainer: Locator;
  readonly car: Locator;
  readonly yearFromInput: Locator;
  readonly yearToInput: Locator;
  readonly typeOfSaleInput: Locator;
  readonly mileageFromInput: Locator;
  readonly mileageToInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.category = page.locator(".css-yrygxu").getByText("Авто");
    this.subcategory = page.locator(".css-1vegftz").getByText("Легкові авто");
    this.photosCheckbox = page.locator("#photos");
    this.priceFromInput = page.getByTestId("range-from-input").first();
    this.priceToInput = page.getByTestId("range-to-input").first();
    this.fromValueContainer = page.getByTestId("from-value-container").first();
    this.toValueContainer = page.getByTestId("flyout-content").first();
    this.car = page.locator(".css-95hdyi").first();
    this.yearFromInput = page.getByTestId("range-from-input").nth(1);
    this.yearToInput = page.getByTestId("range-to-input").nth(1);
    this.typeOfSaleInput = page.getByTestId("range-from-input").nth(2);
    this.mileageToInput = page.getByTestId("range-to-input").nth(2);
    this.mileageFromInput = page.getByTestId("range-from-input").nth(2);
  }

  async openCarsCategory() {
    await this.category.click();
    await this.subcategory.click();
  }

  async checkPhotosOnly() {
    await this.photosCheckbox.check({ timeout: 5000 });
  }

  async setPriceRange(from: string, to: string) {
    await this.priceFromInput.click();
    await this.priceToInput.click({ timeout: 5000 });
  }

  async setPriceBicycle(from: string, to: string) {
    await this.priceFromInput.click();
    await this.fromValueContainer.click();
    await this.priceToInput.click();
    await this.toValueContainer.click({ timeout: 5000 });
  }

  async typeOfCar(filterText: string) {
    await this.car.click();
  }

  async setYear(from: string, to: string) {
    await this.yearFromInput.click();
    await this.yearToInput.click();
  }

  async setTypeOfSale(value: string) {
    await this.typeOfSaleInput.click();
  }

  async setMileage(from: string, to: string) {
    await this.mileageFromInput.fill(from);
    // await this.page.locator()
    await this.mileageToInput.fill(to);

  }
}
