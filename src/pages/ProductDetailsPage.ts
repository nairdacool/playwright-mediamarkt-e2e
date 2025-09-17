import { Locator, Page, expect } from "playwright/test";

export class ProductDetailsPage {
    private readonly page: Page;
    private readonly productTittle: Locator;
    private readonly productDetailsPageAddToCartButton: Locator;
    private readonly serviceWarrantiesList: Locator;
    private readonly serviceWarrantiesListNextButton: Locator;
    private readonly minibasketSuccess: Locator;
    private readonly goToCartMinibasketButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productTittle = page.getByTestId('mms-select-details-header');
        this.productDetailsPageAddToCartButton = page.locator('#pdp-add-to-cart-button');
        this.serviceWarrantiesList = page.getByTestId('mms-services-warranties-list');
        this.serviceWarrantiesListNextButton = page.getByTestId('mms-pre-checkout-primary-button');
        this.minibasketSuccess = page.getByTestId('pdp-minibasket-headline-success');
        this.goToCartMinibasketButton = page.getByTestId('mms-pre-checkout-primary-button');
    };

    async validateProducttitle(expectedProductName: string): Promise<void> {
        await expect(this.productTittle).toBeVisible();
        await expect(this.productTittle).toContainText(expectedProductName);
    };

    async clickAddToCartButton(): Promise<void> {
        await expect(this.productDetailsPageAddToCartButton).toBeVisible();
        await this.productDetailsPageAddToCartButton.click();
        await expect(this.serviceWarrantiesList).toBeVisible();
    };

    async completeAddToCartProcess(minibasketSuccessMessage: string): Promise<void> {
        await expect(this.serviceWarrantiesListNextButton).toBeVisible();
        await this.serviceWarrantiesListNextButton.click();
        await expect(this.minibasketSuccess).toContainText(minibasketSuccessMessage);
    };

    async clickGoToCartMinibasketButton(): Promise<void> {
        await expect(this.goToCartMinibasketButton).toBeVisible();
        await this.goToCartMinibasketButton.click();
    };
}