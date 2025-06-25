import { Locator, Page, expect } from "playwright/test";

export class ProductDetailsPage {
    private readonly page: Page;
    private readonly productTittle: Locator;
    private readonly productDetailsPageAddToCartButton: Locator;
    private readonly serviceWarrantiesList: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productTittle = page.getByTestId('mms-select-details-header');
        this.productDetailsPageAddToCartButton = page.locator('#pdp-add-to-cart-button');
        this.serviceWarrantiesList = page.getByTestId('mms-services-warranties-list');
    };

    async validateProducttitle(expectedProductName: string): Promise<void> {
        await expect(this.productTittle).toBeVisible();
        await expect(this.productTittle).toContainText(expectedProductName);
    };

    async clickAddToCartButton(): Promise<void> {
        await expect(this.productDetailsPageAddToCartButton).toBeVisible();
        await this.productDetailsPageAddToCartButton.click();
        await expect(this.serviceWarrantiesList).toBeVisible();
    }
}