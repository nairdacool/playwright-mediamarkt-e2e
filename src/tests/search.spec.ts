import { test } from '@playwright/test';
import { SearchBar } from '../pages/SearchBar';
import { LandingPage } from '../pages/LandingPage';
import * as allure from "allure-js-commons";
import { ErrorMessages } from '../enums/AppMessages';

test.describe.parallel('Search Bar Tests', () => {

    const baseUrl = process.env.BASE_URL ?? "https://default-url.com";
    const productName = 'Consola - Sony PS5 Slim Digital Edition, 1 TB SSD, 4K, 1 mando, Chasis D, Blanco';
    const nonExistingProdct = 'NonExistingProduct123';

    let searchBar: SearchBar;
    let landingPage: LandingPage;

    test.beforeEach(async ({ page })=> {
        searchBar = new SearchBar(page);
        landingPage = new LandingPage(page);
        await landingPage.goTo(baseUrl);
    });

    test('should search for a product', async ()=> {
        allure.description('This test searches for a product using the search bar');
        await test.step('Search for a product', async () => {
            await searchBar.seachForProduct(productName);
        });
        await test.step('validate search results', async () => {
            await searchBar.validateSearchResults(productName);
        });
    });

    test('should display no results message for non-existing product', async ()=> {
        allure.description('This test checks the no results message for a non-existing product');
        await test.step('search for a non-existing product', async () => {
            await searchBar.seachForProduct(nonExistingProdct);
        });
        await test.step('validate no results message', async () => {
            await searchBar.validateNonExistingProductMessage(ErrorMessages.NO_SEARCH_RESULTS)
        });
    });

    test('should clear search input', async () => {
        allure.description('this test clears the search input after searching for a product');
        await test.step('search for a product', async () => {
            await searchBar.seachForProduct(productName);
        });
        await test.step('clear search input', async () => {
            await searchBar.clearSearchInput(productName);
        });
    });
});