import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login_page/LoginPage';
import * as allure from "allure-js-commons";

test.describe('Login Page Tests', () => {

    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
    })

    test('should navigate to the MediaMarkt page', async ({}) => {
        await loginPage.goTo();
    });

    test('should open the login form and submit valid credentials', async ({}) => {
        allure.description('This test opens the login form and submits valid credentials');
        await test.step('Navigate to MediaMarkt page', async () => {
            await loginPage.goTo();
        });
        await test.step('Open login form', async () => {
            await loginPage.openLoginForm();
        });
        await test.step('Submit login form with valid credentials', async () => {
            await loginPage.submitLoginForm('nairdacool@hotmail.com','1421Cool*', 'Gustavo Adrian Trujillo');
        });
    })
});