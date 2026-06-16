import { Page, Locator } from '@playwright/test';

export class inventorypage {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly productSortDropdown: Locator;
    readonly cartIcon: Locator;
    // readonly cartBadge: Locator;
    readonly burgerMenuButton: Locator;
    readonly logoutLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = page.locator('.title');
        this.productSortDropdown = page.locator('.select_container');
        this.cartIcon = page.locator('.shopping_cart_link');
        this.burgerMenuButton = page.locator('.bm-burger-button');
        this.logoutLink = page.locator('.bm-item menu-item');
    }

    async addProductToCart(productDataTestName: string) {
        await this.page.locator(`[data-test="add-to-cart-${productDataTestName}"]`).click();
    }

    async removeProductFromCart(productDataTestName: string) {
        await this.page
            .locator(`[data-test="remove-${productDataTestName}"]`).click();
    }

    async openCart() {
        await this.cartIcon.click();
    }

    async logout() {
        await this.burgerMenuButton.click();
        await this.logoutLink.click();
    }
}