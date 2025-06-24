import { Locator, Page, expect } from '@playwright/test';

export class LoginPage {

    private readonly page: Page;
    private readonly baseURL: string;
    private readonly myAccountButton: Locator;
    private readonly cookiesConcentButton: Locator;
    private readonly loginInButton: Locator;
    private readonly emailInput: Locator;
    private readonly paswordInput: Locator;
    private readonly submitLoginButton: Locator;
    private readonly userAccountName: Locator;

    constructor(page: Page) {
        this.page = page;
        this.baseURL = 'https://www.mediamarkt.es/es/';
        this.myAccountButton = page.getByTestId('myaccount-dropdown-button');
        this.cookiesConcentButton = page.getByTestId('pwa-consent-layer-accept-all');
        this.loginInButton = page.getByTestId('mms-router-link-myaccount-dropdown-login-button');
        this.emailInput = page.getByTestId('email__input');
        this.paswordInput = page.getByTestId('password__input');
        this.submitLoginButton = page.locator('#mms-login-form__login-button');
        this.userAccountName = page.locator('.sc-e5aec254-0.hisqcf');

    }

    async goTo (): Promise<void> {
        await this.page.goto(this.baseURL);
        await expect(this.page).toHaveURL(this.baseURL);
    };

    async openLoginForm (): Promise<void> {
        await this.cookiesConcentButton.click();
        await this.myAccountButton.click();
        await this.loginInButton.click();
        await expect(this.emailInput).toBeVisible();
    };

    async submitLoginForm (email: string, password: string, name: string): Promise<void> {
        await this.emailInput.fill(email);
        await this.paswordInput.fill(password);
        await this.submitLoginButton.click();
        await this.myAccountButton.click();
        await expect(this.userAccountName).toContainText(name);
    };

};