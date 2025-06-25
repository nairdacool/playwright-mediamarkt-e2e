import { test } from '@playwright/test';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';
import { SearchBar } from '../pages/SearchBar';
import { LandingPage } from '../pages/LandingPage';
import { CartPage } from '../pages/CartPage';
import { SuccessMessages, WarningMessages } from '../enums/AppMessages';
import * as allure from "allure-js-commons";


test.describe.parallel('Shoping Cart Tests', () => {

    const baseUrl = process.env.BASE_URL ?? "https://default-url.com";
    const productName = 'Consola - Sony PS5 Slim Digital Edition, 1 TB SSD, 4K, 1 mando, Chasis D, Blanco';

    let productDetailsPage: ProductDetailsPage;
    let searchBar: SearchBar;
    let landingPage: LandingPage;
    let cartPage: CartPage;

    test.beforeEach(async ({ page }) => {
        productDetailsPage = new ProductDetailsPage(page);
        searchBar = new SearchBar(page);
        landingPage = new LandingPage(page);
        cartPage = new CartPage(page);
        await landingPage.goTo(baseUrl);
    });

    test('should add a product to the cart', async () => {
        allure.description('This test adds a product to the shopping cart');
        await test.step('search for a product', async () => {
            await searchBar.seachForProduct(productName);
        });
        await test.step('Open product details page', async () => {
            await searchBar.selectFirstProductResult();
        });
        await test.step('validate product details page title', async () => {
            await productDetailsPage.validateProducttitle(productName);
        });
        await test.step('click on the add to cart button in the product details page', async () => {
            await productDetailsPage.clickAddToCartButton();
        });
        await test.step('complete the add to cart process', async () => {
            await productDetailsPage.completeAddToCartProcess(SuccessMessages.PRODUCT_SUCCESSFULLY_ADDED);
        });
        await test.step('click on the go to cart button in the mini basket', async () => {
            await productDetailsPage.clickGoToCartMinibasketButton();
        });
        await test.step('validate the cart is displayed', async () => {
            await cartPage.validateCartIsDisplayed(WarningMessages.PRODUCTS_IN_CART);
        });
        await test.step('verify the cart contains the added product', async () => {
            await cartPage.verifyCartContainsProduct(productName);
        });
    });
});