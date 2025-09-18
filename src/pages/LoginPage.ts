import { Locator, Page, expect } from '@playwright/test';

export class LoginPage {

    private readonly page: Page;
    private readonly myAccountButton: Locator;
    
    private readonly loginInButton: Locator;
    private readonly emailInput: Locator;
    private readonly paswordInput: Locator;
    private readonly submitLoginButton: Locator;
    private readonly userAccountName: Locator;
    private readonly invalidCredentialsError: Locator;
    private readonly logOutButton: Locator;
    private readonly LogOutMessage: Locator;
    private readonly closeMiAccountMenuButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.myAccountButton = page.getByTestId('myaccount-dropdown-button');
        
        this.loginInButton = page.getByTestId('mms-router-link-myaccount-dropdown-login-button');
        this.emailInput = page.getByTestId('userName__input');
        this.paswordInput = page.getByTestId('password__input');
        this.submitLoginButton = page.locator('#mms-drawer-login__login-button');
        this.userAccountName = page.locator('.sc-2ab4e761-0.mmAVT');
        this.invalidCredentialsError = page.getByTestId('validationMessage');
        this.logOutButton = page.locator('.sc-836914d0-1.gXOjSA.sc-dcb06c26-2.iiofcE');
        this.LogOutMessage = page.getByTestId('snackbar');
        this.closeMiAccountMenuButton = page.getByTestId('modal-close-button');
    }

    async openLoginForm (): Promise<void> {
        await this.myAccountButton.click();
        //await this.loginInButton.click();
        await expect(this.emailInput).toBeVisible();
    };

    async submitLoginForm (email: string, password: string): Promise<void> {
        await this.emailInput.fill(email);
        await this.paswordInput.fill(password);
        await this.submitLoginButton.click();
    };

    async validateUserLoggedIn(name: string): Promise<void>{
        await this.myAccountButton.click();
        await expect(this.userAccountName).toContainText(name);
    };

    async validateInvalidCredentialsError( invalidCredentialsError: string ): Promise<void> {
        await expect(this.invalidCredentialsError).toBeVisible();
        await expect(this.invalidCredentialsError).toContainText(invalidCredentialsError);
    };

    async logOut(): Promise<void> {
        await this.myAccountButton.click();
        await this.logOutButton.click();
    };

    async validateLogOutMessage( logOutMessage: string ): Promise<void> {
        await expect(this.LogOutMessage).toBeVisible();
        await expect(this.LogOutMessage).toContainText(logOutMessage);
    };

    async closeMyAccountMenu(): Promise<void> {
        await this.closeMiAccountMenuButton.click();
    }
};