export class OpenSourceAdminAddUserPage {
    constructor(page) {
        this.page = page;

        this.adminLink = page.getByRole('link', { name: 'Admin' })
        this.addUserButton = page.getByRole('button', { name: ' Add' })
        this.userRoleForm = page.locator('form i')
        this.userRoleOption = page.getByRole('option', { name: 'ESS' })
        this.employeeNameInput = page.getByPlaceholder('Type for hints...')
        this.employeeNameOption = page.getByRole('option', { name: 'Sania Shaheen' })
        this.statusForm = page.locator('form i')
        this.statusOption = page.getByRole('option', { name: 'Enabled' })
        this.usernameInput = page.getByRole('textbox')
        this.passwordInput = page.getByRole('textbox')
        this.confirmPasswordInput = page.getByRole('textbox')
        this.saveButton = page.getByRole('button', { name: 'Save' })
    }
    
    addEmployee = async (userDetails) => {
        await this.adminLink.waitFor();
        await this.adminLink.click();
        await this.addUserButton.waitFor();
        await this.addUserButton.click();
        await this.userRoleForm.first().waitFor();
        await this.userRoleForm.first().click();
        await this.userRoleOption.click();
        await this.employeeNameInput.waitFor();
        await this.employeeNameInput.fill('san');
        await this.employeeNameOption.waitFor();
        await this.employeeNameOption.click();
        await this.statusForm.nth(1).waitFor();
        await this.statusForm.nth(1).click();
        await this.statusOption.waitFor();
        await this.statusOption.click();
        await this.usernameInput.nth(2).waitFor();
        await this.usernameInput.nth(2).fill(userDetails.username);
        await this.passwordInput.nth(3).waitFor();
        await this.passwordInput.nth(3).fill(userDetails.password);
        await this.confirmPasswordInput.nth(4).waitFor();
        await this.confirmPasswordInput.nth(4).fill(userDetails.confirmPassword);
        await this.saveButton.waitFor();
        await this.saveButton.click();
    }
}