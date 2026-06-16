import { Page, Locator } from '@playwright/test';

export class cartpage {

    readonly page: Page;
    readonly cartitems: Locator;
    readonly removeButton: Locator;
    readonly continueShoppingButton: Locator;
    readonly checkButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartitems = page.locator('[data-test="inventory-item"]');
        this.removeButton = page.locator('.btn_secondary.cart_button');
        this.continueShoppingButton = page.locator('.btn btn_secondary back btn_medium');
        this.checkButton = page.locator('.btn btn_action btn_medium checkout_button ');
    }

    async clickCheckout() {
        await this.checkButton.click();
    }

    async clickContinueShopping() {
        await this.continueShoppingButton.click();
    }

}