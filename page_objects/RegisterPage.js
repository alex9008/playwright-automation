import { v4 as uuidv4 } from 'uuid';

export class RegisterPage {
    
    constructor(page) {
        this.page = page

        this.usernameInput = page.getByPlaceholder('E-Mail')
        this.passwordInput = page.getByPlaceholder('Password')
    
    }

    visit = async () => {
        await this.page.goto("/signup")
    }

    register = async (username, password) => {
        await this.usernameInput.waitFor()
        await this.usernameInput.fill(username);
        await this.passwordInput.waitFor()
        await this.passwordInput.fill(password);
    }

    generateRandomEmail() {
        return `${uuidv4()}@gmail.com`;
    }
      
    generateRandomPassword() {
        return uuidv4();
    }
}