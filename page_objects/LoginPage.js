
export class LoginPage {
    
    constructor(page) {
        this.page = page

        this.usernameInput = page.locator('[data-qa="username-input"]')
        this.passwordInput = page.locator('[data-qa="password-input"]')
        this.loginButton = page.locator('[data-qa="login-button"]')
    
    }

    visit = async () => {
        await this.page.goto("/login")
    }

    login = async (username, password) => {
        await this.usernameInput.type(username)
        await this.passwordInput.type(password)
        await this.loginButton.click()
    }
}