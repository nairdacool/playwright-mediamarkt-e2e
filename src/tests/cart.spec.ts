import { test } from '@playwright/test';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';
import { Search } from '../pages/Search';
import { LandingPage } from '../pages/LandingPage';
import { CartPage } from '../pages/CartPage';
import { CheckOutPage } from '../pages/CheckoutPage';
import { SuccessMessages, WarningMessages } from '../enums/AppMessages';
import { CustomerDetails, ShippingDetails } from '../enums/CustomerData';
import * as allure from "allure-js-commons";


test.describe.parallel('Shoping Cart Tests', () => {

    const baseUrl = process.env.BASE_URL ?? "https://default-url.com";
    const productName = 'Consola - Sony PS5 Slim Digital Edition, 1 TB SSD, 4K, 1 mando, Chasis D, Blanco';

    let productDetailsPage: ProductDetailsPage;
    let searchBar: Search;
    let landingPage: LandingPage;
    let cartPage: CartPage;
    let checkOutPage: CheckOutPage;

    test.beforeEach(async ({ page }) => {
        productDetailsPage = new ProductDetailsPage(page);
        searchBar = new Search(page);
        landingPage = new LandingPage(page);
        cartPage = new CartPage(page);
        checkOutPage = new CheckOutPage(page);
        await landingPage.goTo(baseUrl);
    });

    test('should add a product to the cart and checkout it', async () => {
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
        await test.step('click on the checkout button', async () => {
            await cartPage.clickCheckoutButton();
        });
        await test.step('continue to checkout as a guest', async () => {
            await checkOutPage.clickGuestCheckoutButton();
        });
        await test.step('fill customer details', async () => {
            await checkOutPage.fillCustomerDetails(
                CustomerDetails.FIRST_NAME,
                CustomerDetails.LAST_NAME,
                CustomerDetails.TAX_ID,
                CustomerDetails.PHONE_NUMBER,
                CustomerDetails.EMAIL
            );
        });
        await test.step('add shipping address manually', async () => {
            await checkOutPage.addShippingAddressManually(
                ShippingDetails.ZIP_CODE,
                ShippingDetails.CITY,
                ShippingDetails.STREET,
                ShippingDetails.HOUSE_NUMBER,
                ShippingDetails.ADDITIONAL_INFORMATION
            )
        });
        await test.step('click on the continue button to proceed with checkout', async () => {
            await checkOutPage.clickCheckoutContinueButton();
        });
        await test.step('confirm the address in the modal (If required)', async () => {
            await checkOutPage.confirmAddress(ShippingDetails.ADDITIONAL_INFORMATION);
        });
        await test.step('click on the continue to payment button', async () => {
            await checkOutPage.clickContinueToPaymentButton(WarningMessages.PAYMENT_METHOD);
        });
        await test.step('click on the continue to summary button', async () => {
            await checkOutPage.clickContinueToSummaryButton();
        });
        await test.step('validate the summary delivery details', async () => {
            await checkOutPage.validateSummaryDeliveryDetails(
                CustomerDetails.FIRST_NAME,
                CustomerDetails.LAST_NAME,
                ShippingDetails.ADDITIONAL_INFORMATION,
            );
        });
        await test.step('validate the summary product details', async () => {
            await checkOutPage.validateSummaryProductDetails(productName);
        });
        await test.step('click the consent checkbox and proceed to do the payment', async () => {
            await checkOutPage.clickConsentCheckbox();
            await checkOutPage.clickGoToDoThePaymentButton();
            await checkOutPage.validatePaymentFormVisible(WarningMessages.PAYMENT_FORM_TITTLE);
        });
    });
});