import { expect } from "@playwright/test"

export class PaymentPage {

    constructor(page) {
        this.page = page

        this.cardOwnerInput = page.getByPlaceholder('Credit card owner')
        this.cardNumberInput = page.getByPlaceholder('Credit card number')
        this.expiryDateInput = page.getByPlaceholder('Valid until')
        this.cvvInput = page.getByPlaceholder('Credit card CVC')
        this.payButton = page.getByRole('button', { name: 'Pay' })
        this.discountCode = page.frameLocator('[data-qa="active-discount-container"]')
                                .locator('[data-qa="discount-code"]')

        this.discountCodeInput = page.getByPlaceholder('Discount code')
        this.discountCodeApplyButton = page.getByRole('button', { name: 'Submit discount' })
        this.totalPrice = page.locator('[data-qa="total-value"]')
        this.discountedPrice = page.locator('[data-qa="total-with-discount-value"]')
    }

    fillPaymentDetails = async (paymentDetails) => {
        await this.cardOwnerInput.waitFor()
        await this.cardOwnerInput.fill(paymentDetails.cardHolder)
        await this.cardNumberInput.waitFor()
        await this.cardNumberInput.fill(paymentDetails.cardNumber)
        await this.expiryDateInput.waitFor()
        await this.expiryDateInput.fill(paymentDetails.expiryDate)
        await this.cvvInput.waitFor()
        await this.cvvInput.fill(paymentDetails.cvv)
    }

    pay = async () => {
        await this.payButton.waitFor()
        await this.payButton.click()
        await this.page.waitForURL(/\/thank-you/gm)
    }

    activateDiscount = async () => {
        await this.discountCode.waitFor()
        const code = await this.discountCode.innerText()
        await this.discountCodeInput.fill(code)
        await expect(this.discountCodeInput).toHaveValue(code)
    

        // // Optional: pause the test to see the discount applied
        // await this.discountCodeInput.focus()
        // await this.page.keyboard.type(code, { delay: 1000 })
        // expect(await this.discountCodeInput.inputValue()).toBe(code)

        // check that it not displays the discounted price befero applying the discount
        await expect(this.discountedPrice).not.toBeVisible()
        // check that the total price is visible
        await expect(this.totalPrice).toBeVisible()
        // apply the discount
        await this.discountCodeApplyButton.click()
        // check that the discounted price is visible
        await expect(this.discountedPrice).toBeVisible()
        // check that the discounted price is less than the total price
        const total = parseFloat(await this.totalPrice.innerText())
        const discounted = parseFloat(await this.discountedPrice.innerText())
        expect(discounted).toBeLessThan(total)

        
    }
        
}