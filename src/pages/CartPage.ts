import { Locator, Page, expect } from "playwright/test";

export class CartPage {

    private readonly page: Page;
    private readonly cartTitle: Locator;
    private readonly productsInCartWarn: Locator;
    private readonly sellBasket: Locator;
    private readonly cartCheckoutButton: Locator;
    

    constructor(page: Page) {
        this.page = page;
        this.cartTitle = page.getByTestId('step-wrapper-title');
        this.productsInCartWarn = page.locator("//div[@class='sc-d571b66f-0 dXsqkK']");
        this.sellBasket = page.getByTestId('mms-seller-basket');
        this.cartCheckoutButton = page.getByTestId('checkout-continue-desktop-enabled');

    };

    async validateCartIsDisplayed(productsInCartWarn: string): Promise<void> {
        await expect(this.cartTitle).toBeVisible();
        await expect(this.productsInCartWarn).toContainText(productsInCartWarn);
    };

    async verifyCartContainsProduct(productName: string): Promise<void> {
        await expect(this.sellBasket).toContainText(productName);
    };

    async clickCheckoutButton(): Promise<void> {
        await this.cartCheckoutButton.click();
    }
}