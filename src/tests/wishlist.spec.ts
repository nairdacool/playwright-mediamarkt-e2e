import { test } from '@playwright/test';
import { LandingPage } from '../pages/LandingPage';
import { Search } from '../pages/Search';
import { LoginPage } from '../pages/LoginPage';
import { WishlistPage } from '../pages/WishlistPage';
import * as allure from "allure-js-commons";
import { SuccessMessages, WarningMessages } from '../enums/AppMessages';

test.describe.parallel('Wishlist Tests', () => {

    const baseUrl = process.env.BASE_URL ?? "https://default-url.com";
    const username = process.env.LOGIN_EMAIL ?? 'defaultUser';
    const password = process.env.LOGIN_PASSWORD ?? 'defaultPassword';

    const productName = 'Consola - Sony PS5 Slim Digital Edition, 1 TB SSD, 4K, 1 mando, Chasis D, Blanco';
    
    let landingPage: LandingPage;
    let searchBar: Search;
    let loginPage: LoginPage;
    let wishlistPage: WishlistPage;

    test.beforeEach(async({ page }) => {
        landingPage = new LandingPage(page);
        searchBar = new Search(page);
        loginPage = new LoginPage(page);
        wishlistPage = new WishlistPage(page);

        await landingPage.goTo(baseUrl);
    });

    test('should add a product to the wishlist', async () => {
        allure.description('This test adds a product to the wishlist');
        await test.step('Log in into customer account', async () => {
            await loginPage.openLoginForm();
            await loginPage.submitLoginForm(username, password);
        });
        await test.step('validate successful login', async () => {
            await loginPage.validateUserLoggedIn('Gustavo Adrian Trujillo');
            await loginPage.closeMyAccountMenu();
        });
        await test.step('Search for a product', async () => {
            await searchBar.seachForProduct(productName);
        });
        await test.step('add product to wishlist from search results', async () => {
            await searchBar.clickAddTowishlistButton();
        });
        await test.step('validate wishlist notification message', async () => {
            await searchBar.validatewishlitNotificationMessage(SuccessMessages.ADDED_SUCCESSFULLY_TO_WISHLIST);
        });
        await test.step('open wishlist', async () => {
            await landingPage.openWishlist();
        });
        await test.step('validate wishlist tittle', async () => {
            await wishlistPage.validateWishlistTittle(WarningMessages.WISHLIST_TITTLE);
        });
        await test.step('open wishlist actions menu', async () => {
            await wishlistPage.openWishlistActionsMenu();
        });
        await test.step('delete product from wishlist', async () => {
            await wishlistPage.deleteProductFromWishlist(SuccessMessages.PRODUCT_REMOVED_FROM_WISHLIST  );
        });
        await test.step('validate empty wishlist message', async () => {
            await wishlistPage.validateEmptyWishlistMessage(WarningMessages.EMPTY_WISHLIST);
        });
    });

});