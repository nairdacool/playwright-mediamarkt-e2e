import { test } from '@playwright/test';
import { SearchBar } from '../pages/SearchBar';
import { LandingPage } from '../pages/LandingPage';
import * as allure from "allure-js-commons";

test.describe.parallel('Search Bar Tests', () => {

    const baseUrl = process.env.BASE_URL || "https://default-url.com";
    const productName = 'Consola - Sony PS5 Slim Digital Edition, 1 TB SSD, 4K, 1 mando, Chasis D, Blanco';

    let searchBar: SearchBar;
    let landingPage: LandingPage;

    test.beforeEach(async ({ page })=> {
        searchBar = new SearchBar(page);
        landingPage = new LandingPage(page);
    });

    test('should search for a product', async ()=> {
        allure.description('This test searches for a product using the search bar');
        await test.step('Navigate to the Mediamarkt page', async () => {
            await landingPage.goTo(baseUrl);
        });
        await test.step('Search for a product', async () => {
            await searchBar.seachForProduct(productName);
        });
        await test.step('validate search results', async () => {
            await searchBar.validateSearchResults(productName);
        })
    });
});