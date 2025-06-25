import { Locator, Page, expect } from "playwright/test";

export class SearchBar {

    private readonly page: Page;
    private readonly searchInput: Locator;
    private readonly searchResults: Locator;
    private readonly noResultsMessage: Locator;
    private readonly clearSeachButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchInput = page.locator('#search-form');
        this.searchResults = page.getByTestId('mms-search-srp-productlist');
        this.noResultsMessage = page.getByTestId('mms-search-main');
        this.clearSeachButton = page.locator('.sc-a72f22b3-0.iQxZdB');
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
    }
};