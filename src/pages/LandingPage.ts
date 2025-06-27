import { Locator, Page, expect } from "playwright/test";

export class LandingPage {
    private readonly page: Page;
    private readonly cookiesConcentButton: Locator;
    private readonly wishlistButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cookiesConcentButton = page.getByTestId('pwa-consent-layer-accept-all');
        this.wishlistButton = page.locator('.sc-905ed05d-0.fShZkz').first();
    }
    /**
     * Navigates to the specified base URL and verifies that the page has loaded correctly.
     * @param baseURL - The base URL to navigate to.
     */
    async goTo (baseURL: string): Promise<void> {
        await this.page.goto(baseURL);
        await this.cookiesConcentButton.click();
        await expect(this.page).toHaveURL(baseURL);
    };

    async openWishlist(): Promise<void> {
        await this.wishlistButton.click();
        
    }
}
