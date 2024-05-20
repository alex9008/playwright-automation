import { expect } from "@playwright/test"

export class OpenSourceLoginPage {

    constructor(page) {
        this.page = page

        this.usernameInput = page.getByPlaceholder('Username')
        this.passwordInput = page.getByPlaceholder('Password')
        this.loginButton = page.getByRole('button', { name: 'Login' })
    }

    visit = async () => {
        this.page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    }

    login = async (openSourceUserDetails) => {
        await this.usernameInput.waitFor()
        await this.usernameInput.fill(openSourceUserDetails.username)
        await this.passwordInput.waitFor()
        await this.passwordInput.fill(openSourceUserDetails.password)
        await this.loginButton.waitFor()
        await this.loginButton.click()
        await expect(this.page).toHaveTitle('OrangeHRM')
    }


}