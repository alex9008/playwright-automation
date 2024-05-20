import { expect } from "@playwright/test"

export class ThankYouPage {
    
    constructor(page) {
        this.page = page

        this.thankYouMessage = page.getByRole('heading', { name: 'Thank you for shopping with us!' })
        this.backToShopButton = page.getByRole('button', { name: 'Back to shop' })
    
    }

    getThankYouMessage = async () => {
        return await this.thankYouMessage.allInnerTexts()
    }

    backToShop = async () => {
        await this.backToShopButton.waitFor()
        await this.backToShopButton.click()
        await this.page.waitForURL("/")
    }
}