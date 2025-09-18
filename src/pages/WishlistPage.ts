import { Page, Locator, expect } from '@playwright/test';

export class WishlistPage {
    private readonly page: Page;
    private readonly wishlistHeader: Locator;
    private readonly wishlistActionsMenu: Locator;
    private readonly deleteProductFromWishListActionsMenu: Locator;
    private readonly snackbarMessage: Locator;
    private readonly emptyWishlistMessage: Locator;
    private readonly humanVerification: Locator;

    constructor(page: Page) {
        this.page = page;
        this.wishlistHeader = page.locator('.sc-4a318613-0.cEzViG').first();
        this.wishlistActionsMenu = page.getByTestId('wishlist-product-card-flyout-menu').first();
        this.deleteProductFromWishListActionsMenu = page.locator('.sc-94eb08bc-0.cIXvrS').nth(6);
        this.snackbarMessage = page.getByTestId('snackbar');
        this.emptyWishlistMessage = page.getByTestId('myacc-page-empty-wishlist');
        this.humanVerification = page.locator('#myaccount-turnstile-captcha');
    };

    async validateWishlistTittle(ExpectedTittle: string): Promise<void>{
        await expect(this.wishlistHeader).toBeVisible();
        await expect(this.wishlistHeader).toContainText(ExpectedTittle);
    };

    async openWishlistActionsMenu(): Promise<void> {
        //await this.humanVerification.waitFor({ state: 'visible' });
        await expect(this.wishlistActionsMenu).toBeVisible();
        await this.wishlistActionsMenu.click();
    };

    async deleteProductFromWishlist(deletedMessage: string ): Promise<void> {
        await this.deleteProductFromWishListActionsMenu.click();
        await expect(this.snackbarMessage).toContainText(deletedMessage);
    };

    async validateEmptyWishlistMessage(expectedMessage: string): Promise<void> {
        await expect(this.emptyWishlistMessage).toBeVisible();
        await expect(this.emptyWishlistMessage).toContainText(expectedMessage);
    };
}