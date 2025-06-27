import { Locator, Page, expect } from "playwright/test";

export class Search {

    private readonly page: Page;
    private readonly searchInput: Locator;
    private readonly searchResults: Locator;
    private readonly noResultsMessage: Locator;
    private readonly clearSeachButton: Locator;
    private readonly selectFirstCardResult: Locator;
    private readonly searchAddToWishlistButton: Locator;
    private readonly wishlistNotification: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchInput = page.locator('#search-form');
        this.searchResults = page.getByTestId('mms-search-srp-productlist');
        this.noResultsMessage = page.getByTestId('mms-search-main');
        this.clearSeachButton = page.locator('.sc-a72f22b3-0.iQxZdB');
        this.selectFirstCardResult = page.getByTestId('mms-router-link-product-list-item-link').first();
        this.searchAddToWishlistButton = page.getByTestId('mms-search-wishlist-unselected').first();
        this.wishlistNotification = page.getByTestId('mms-search-wishlist-notification');
    };
    
    async seachForProduct(productName: string): Promise<void>{
        await this.searchInput.fill(productName);
        await this.searchInput.press('Enter');
    };

    async validateSearchResults(expectedProductName: string): Promise<void> {
        await expect(this.searchResults).toBeVisible();
        await expect(this.searchResults).toContainText(expectedProductName);
    };

    async validateNonExistingProductMessage(NonExistingProductMessage: string): Promise<void> {
        await expect(this.noResultsMessage).toBeVisible();
        await expect(this.noResultsMessage).toContainText(NonExistingProductMessage);
    };

    async clearSearchInput(expectedProductName: string): Promise<void> {
        await this.clearSeachButton.click();
        await expect(this.searchInput).not.toHaveValue(expectedProductName);
    };

    async selectFirstProductResult(): Promise<void> {
        await this.selectFirstCardResult.click();
    };

    async clickAddTowishlistButton(): Promise<void> {
        await this.searchAddToWishlistButton.waitFor({ state: 'visible' });
        await this.searchAddToWishlistButton.click();
    };
    
    async validatewishlitNotificationMessage(expectedMessage: string): Promise<void> {
        await expect(this.wishlistNotification).toBeVisible();
        await expect(this.wishlistNotification).toContainText(expectedMessage);
    }
};