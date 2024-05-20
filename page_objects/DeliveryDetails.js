import { expect } from "@playwright/test"   

export class DeliveryDetails {
    
    constructor(page) {
        this.page = page

        this.firstNameInput = page.getByPlaceholder('First name')
        this.lastNameInput = page.getByPlaceholder('Last name')
        this.streetInput = page.getByPlaceholder('Street')
        this.postCodeInput = page.getByPlaceholder('Post code')
        this.cityInput = page.getByPlaceholder('City')
        this.countryDropdown = page.locator('[data-qa="country-dropdown"]')
        this.continuePayment = page.getByRole('button', { name: 'Continue to payment' })
        this.saveDetailsButton = page.getByRole('button', { name: 'Save address for next time' })
        this.saveDetailsContainer = page.locator('[data-qa="saved-address-container"]')
        this.firstNameInputValue = page.locator('[data-qa="saved-address-firstName"]')
        this.lastNameInputValue = page.locator('[data-qa="saved-address-lastName"]')
        this.streetInputValue = page.locator('[data-qa="saved-address-street"]')
        this.postCodeInputValue = page.locator('[data-qa="saved-address-postcode"]')
        this.cityInputValue = page.locator('[data-qa="saved-address-city"]')
        this.countryDropdownValue = page.locator('[data-qa="saved-address-country"]')
    }
    
    fillDeliveryDetails = async (userData) => {
        await this.firstNameInput.waitFor()
        await this.firstNameInput.fill(userData.firstName)
        await this.lastNameInput.waitFor()
        await this.lastNameInput.fill(userData.lastName)
        await this.streetInput.waitFor()
        await this.streetInput.fill(userData.street)
        await this.postCodeInput.waitFor()
        await this.postCodeInput.fill(userData.postcode)
        await this.cityInput.waitFor()
        await this.cityInput.fill(userData.city)
        await this.countryDropdown.waitFor()
        await this.countryDropdown.selectOption(userData.country)

    }

    saveDeliveryDetails = async () => {
        const detailsCountBeforeSave = await this.saveDetailsContainer.count()
        await this.saveDetailsButton.waitFor()
        await this.saveDetailsButton.click()
        await expect(this.saveDetailsContainer).toHaveCount(detailsCountBeforeSave + 1)
        await this.firstNameInputValue.first().waitFor()
        expect(await this.firstNameInputValue.first().innerText()).toBe(await this.firstNameInput.inputValue())
        await this.lastNameInputValue.first().waitFor()
        expect(await this.lastNameInputValue.first().innerText()).toBe(await this.lastNameInput.inputValue())
        await this.streetInputValue.first().waitFor()
        expect(await this.streetInputValue.first().innerText()).toBe(await this.streetInput.inputValue())
        await this.postCodeInputValue.first().waitFor()
        expect(await this.postCodeInputValue.first().innerText()).toBe(await this.postCodeInput.inputValue())
        await this.cityInputValue.first().waitFor()
        expect(await this.cityInputValue.first().innerText()).toBe(await this.cityInput.inputValue())
        await this.countryDropdownValue.first().waitFor()
        expect(await this.countryDropdownValue.first().innerText()).toBe(await this.countryDropdown.inputValue())
    }
    
    continueToPayment = async () => {
        await this.continuePayment.waitFor()
        await this.continuePayment.click()
        await this.page.waitForURL(/\/payment/gm)
    }
} 