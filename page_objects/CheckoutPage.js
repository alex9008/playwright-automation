import { expect } from "@playwright/test"

export class CheckoutPage {
    
    constructor(page) {
        this.page = page

        this.basketCards = page.locator('[data-qa="basket-card"]')
        this.basketItemPrice = page.locator('[data-qa="basket-item-price"]')
        this.removeButton = page.locator('[data-qa="basket-card-remove-item"]')
    
    }

    removeCheapestProduct = async () => {
        await this.basketCards.first().waitFor()
        const basketCountBeforeRemoving = await this.basketCards.count()
        const prices = await this.basketItemPrice.allInnerTexts()
        const pricesAsNumbers = prices.map(price => parseFloat(price.replace("£", "")))
        const cheapestIndex = pricesAsNumbers.indexOf(Math.min(...pricesAsNumbers))
        const removeButton = this.removeButton.nth(cheapestIndex)
        await removeButton.waitFor()
        await removeButton.click()
        await expect(this.basketCards).toHaveCount(basketCountBeforeRemoving - 1)
    }
}