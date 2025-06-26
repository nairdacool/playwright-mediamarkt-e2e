const PhoneNumber = process.env.CUSTOMER_PHONE_NUMBER ?? '';
const TaxId = process.env.TAX_ID ?? '';

export const CustomerDetails = {
    FIRST_NAME: 'Peter',
    LAST_NAME: 'Greyjoy',
    TAX_ID: TaxId,
    PHONE_NUMBER: PhoneNumber,
    EMAIL: 'customer@email.com',
};

export enum ShippingDetails {
    ZIP_CODE = '08036',
    CITY = 'Barcelona',
    STREET = 'Av. Diagonal, L Eixampl',
    HOUSE_NUMBER = '477',
    ADDITIONAL_INFORMATION = "Av. Diagonal, L Eixampl 477 , 08036, Barcelona, España",
}