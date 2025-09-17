import { test } from '@playwright/test';
import { LandingPage } from '../pages/LandingPage';
import { LoginPage } from '../pages/LoginPage';
import * as allure from "allure-js-commons";

import { ErrorMessages, SuccessMessages } from '../enums/AppMessages';

test.describe.parallel('Login Page Tests', () => {

    const baseUrl = process.env.BASE_URL ??  "https://default-url.com";
    const username = process.env.LOGIN_EMAIL ?? 'defaultUser';
    const password = process.env.LOGIN_PASSWORD?? 'defaultPassword';

    let loginPage: LoginPage;
    let landingPage: LandingPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        landingPage = new LandingPage(page);
        await landingPage.goTo(baseUrl);
    })

    test('should open the login form and submit valid credentials', async () => {
        allure.description('This test opens the login form and submits valid credentials');
        await test.step('Open login form', async () => {
            await loginPage.openLoginForm();
        });
        await test.step('Submit login form with valid credentials', async () => {
            await loginPage.submitLoginForm(username, password);
        });
        await test.step('Validate user is logged in', async () => {
            await loginPage.validateUserLoggedIn('Gustavo Adrian Trujillo');
        });
    });

    test('should open the login form and submit invalid credentials', async () => {
        allure.description('This test opens the login form and submits invalid credentials');
        await test.step('Open login form', async () => {
            await loginPage.openLoginForm();
        });
        await test.step('Submit login form with invalid credentials', async () => {
            await loginPage.submitLoginForm('testemail@test.test','1234')
        });
        await test.step('Validate invalid credentials error is displaued', async () => {
            await loginPage.validateInvalidCredentialsError( ErrorMessages.INVALID_CREDENTIALS );
        });
    });

    test('should log out the user', async () => {
        allure.description('this test logs out the user');
        await test.step('Open login form and submit valid credentials', async () => {
            await loginPage.openLoginForm();
            await loginPage.submitLoginForm(username, password);
        });
        await test.step('Log out the user', async () => {
            await loginPage.logOut();
        });
        await test.step('Validate user is logged out', async () => {
            await loginPage.validateLogOutMessage(SuccessMessages.LOGGED_OUT);
        });
    })
});