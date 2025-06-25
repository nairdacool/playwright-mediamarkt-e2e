import { Locator, Page, expect } from "playwright/test";

export class SearchBar {

    private readonly page: Page;
    private readonly searchInput: Locator;
    private readonly searchResults: Locator;
    private readonly noResultsMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchInput = page.locator('#search-form-label');
        this.searchResults = page.getByTestId('mms-search-srp-productlist');
        this.noResultsMessage = page.getByTestId('mms-search-main');
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
    }
};