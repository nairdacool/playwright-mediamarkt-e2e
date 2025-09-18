import { Locator, Page, expect } from '@playwright/test';

export class CheckOutPage {

    private readonly page: Page;
    private readonly guestCheckoutButton: Locator;
    private readonly deliveryDetailsTitle: Locator;
    private readonly shippingFisrtName: Locator;
    private readonly shippingLastName: Locator;
    private readonly customerTaxId: Locator;
    private readonly shippingPhoneNumer: Locator;
    private readonly shippingCustomerEmail: Locator;
    private readonly shippingZipCode: Locator;
    private readonly shippingCity: Locator;
    private readonly shippingStreet: Locator;
    private readonly shippingHouseNumber: Locator;
    private readonly shippingAdditionalInformation: Locator;
    private readonly checkoutContinueButton: Locator;
    private readonly addAddressManuallyButton: Locator;
    private readonly confirmAddressButton: Locator;
    private readonly confirmAddressModal: Locator;
    private readonly deliveryMethodTitle: Locator;
    private readonly deliveryAddress: Locator;
    private readonly continueToPaymentButton: Locator;
    private readonly selectPaymentMethod: Locator;
    private readonly continueToSummaryButton: Locator;
    private readonly summaryDeliveryCard: Locator;
    private readonly summaryProductCard: Locator;
    private readonly consentCheckbox: Locator;
    private readonly goToDoThePaymentButton: Locator;
    private readonly paymentFormTittle: Locator;


    constructor(page: Page) {
        this.page = page;
        this.guestCheckoutButton = page.getByTestId('guest-checkout');
        this.deliveryDetailsTitle = page.getByTestId('step-wrapper-title');
        this.shippingFisrtName = page.getByTestId('shipping_firstname');
        this.shippingLastName = page.getByTestId('shipping_lastname');
        this.customerTaxId = page.getByTestId('customer_customerTaxId');
        this.shippingPhoneNumer = page.getByTestId('shipping_phoneNumber');
        this.shippingCustomerEmail = page.getByTestId('customer_email');
        this.shippingZipCode = page.getByTestId('shipping_zipcode');
        this.shippingCity = page.getByTestId('shipping_city');
        this.shippingStreet = page.getByTestId('shipping_street');
        this.shippingHouseNumber = page.getByTestId('shipping_houseNumber');
        this.shippingAdditionalInformation = page.getByTestId('shipping_additionalInfo');
        this.checkoutContinueButton = page.getByTestId('checkout-continue-desktop-enabled').nth(1);
        this.addAddressManuallyButton = page.getByTestId('add-address-manually');
        this.confirmAddressButton = page.locator('.sc-836914d0-1.fHRxoY.sc-ee1c7543-1.gnpuAl');
        this.confirmAddressModal = page.locator('#mms-styled-modal-inner-wrapper');
        this.deliveryMethodTitle = page.getByTestId('step-wrapper-title');
        this.deliveryAddress = page.locator('.sc-b350c14-0.LIcee');
        this.continueToPaymentButton = page.getByTestId('checkout-continue-desktop-enabled').nth(1);
        this.selectPaymentMethod = page.getByTestId('step-wrapper-description');
        this.continueToSummaryButton = page.getByTestId('checkout-continue-desktop-enabled').nth(1);
        this.summaryDeliveryCard = page.getByTestId('summary-card-delivery');
        this.summaryProductCard = page.locator('.sc-637a2157-0.kPVeTa');
        this.consentCheckbox = page.getByTestId('icon-test-id');
        this.goToDoThePaymentButton = page.getByTestId('checkout-continue-button').nth(1);
        this.paymentFormTittle = page.locator('.creditcard-container');
    };

    async clickGuestCheckoutButton(): Promise<void> {
        await this.guestCheckoutButton.click();
        expect(this.deliveryDetailsTitle).toBeVisible();
    };

    async fillCustomerDetails(FirstName: string, LastName: string, TaxId: string, PhoneNumber: string, Email: string): Promise<void> {
        await this.shippingFisrtName.fill(FirstName);
        await this.shippingLastName.fill(LastName);
        await this.customerTaxId.fill(TaxId);
        await this.shippingPhoneNumer.fill(PhoneNumber);
        await this.shippingCustomerEmail.fill(Email);
    };

    async addShippingAddressManually(ZipCode: string, City: string, Street: string, HouseNumber: string, AddInfo: string): Promise<void> {
        await this.addAddressManuallyButton.click();
        await this.shippingZipCode.fill(ZipCode);
        await this.shippingCity.fill(City);
        await this.shippingStreet.fill(Street);
        await this.shippingHouseNumber.fill(HouseNumber);
        await this.shippingAdditionalInformation.fill(AddInfo);
    };

    async clickCheckoutContinueButton(): Promise<void> {
        await this.checkoutContinueButton.click();
    };

    async confirmAddress(deliveryAddress: string): Promise<void> {
            await this.confirmAddressButton.waitFor({ state: 'visible' });
            await this.confirmAddressButton.click({delay: 1000});
    };

    async clickContinueToPaymentButton(Payment_method: string): Promise<void> {
        await this.continueToPaymentButton.click();
        await expect(this.selectPaymentMethod).toBeVisible();
        await expect(this.selectPaymentMethod).toContainText(Payment_method);
    };

    async clickContinueToSummaryButton(): Promise<void> {
        await this.continueToSummaryButton.click();
    };

    async validateSummaryDeliveryDetails(FirstName: string, LastName: string, Address: string): Promise<void> {
        await expect(this.summaryDeliveryCard).toBeVisible();
        await expect(this.summaryDeliveryCard).toContainText(FirstName+' '+LastName);
        await expect(this.summaryDeliveryCard).toContainText(Address);
    };

    async validateSummaryProductDetails(ProductName: string): Promise<void> {
        await expect(this.summaryProductCard).toBeVisible();
        await expect(this.summaryProductCard).toContainText(ProductName);
    };

    async clickConsentCheckbox(): Promise<void> {
        await this.consentCheckbox.click();
    };

    async clickGoToDoThePaymentButton(): Promise<void> {
        await this.goToDoThePaymentButton.click();
    };

    async validatePaymentFormVisible(expectedTitle: string): Promise<void> {
        await expect(this.paymentFormTittle).toBeVisible();
        await expect(this.paymentFormTittle).toContainText(expectedTitle);
    }
}