import { isDesktopView } from "../utils/isDesktopView.js"


export class Navigation {
    
    constructor(page) {
        this.page = page

        this.basketCounter = page.locator(`[data-qa="header-basket-count"]`),
        this.checkoutLink = page.getByRole('link', { name: 'Checkout' })
        this.checkoutButton = page.locator('[data-qa="continue-to-checkout"]')
        this.registerButton = page.locator('[data-qa="go-to-signup-button"]')
        this.confirmRegister = page.getByRole('button', { name: 'Register' })
        this.continuePayment = page.getByRole('button', { name: 'Continue to payment' })
        this.mobileBurgerMenu = page.locator('[data-qa="burger-button"]')
    
    }

    getBasketCount = async () => {
        await this.basketCounter.waitFor()
        const text = await this.basketCounter.innerText()
        return parseInt(text, 10)
    }

    goToCheckout = async () => {
        // if mobile viewport, first open the bugger menu
        if(!isDesktopView(this.page)){
            await this.mobileBurgerMenu.waitFor()
            await this.mobileBurgerMenu.click()
        }
      

        await this.checkoutLink.waitFor()
        await this.checkoutLink.click()
        await this.page.waitForURL("/basket")
    }

    goToLogin = async () => {
        await this.checkoutButton.waitFor()
        await this.checkoutButton.click()
        await this.page.waitForURL(/\/login/gm)
    }

    goToRegister = async () => {
        await this.registerButton.waitFor()
        await this.registerButton.click()
        await this.page.waitForURL(/\/signup/gm)
    }

    goToDeliveryDetails = async () => {
        await this.confirmRegister.waitFor()
        await this.confirmRegister.click()
        await this.page.waitForURL(/\/delivery-details/gm)
    }

}