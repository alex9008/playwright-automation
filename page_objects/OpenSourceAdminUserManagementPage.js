import { expect } from "@playwright/test";
import { OpenSourceAdminAddUserPage } from "./OpenSourceAdminAddUserPage.js";

export class OpenSourceAdminUserManagementPage {
    
    constructor(page) {
        this.page = page;
        this.adminLink = page.getByRole('link', { name: 'Admin' })

        this.searchUserInput = page.getByRole('textbox');
        this.searchButton = page.getByRole('button', { name: 'Search' });
        this.recordFound =  page.getByText('(1) Record Found');

        this.deleteButton = page.getByRole('button', { name: ' Delete Selected' })
        this.deleteButtonYes = page.getByRole('button', { name: ' Yes, Delete' })
    }
    searchUser = async (userDetails) => {
        await this.adminLink.waitFor();
        await this.adminLink.click();
        await this.searchUserInput.nth(1).waitFor();
        await this.searchUserInput.nth(1).fill(userDetails.username);
        await this.searchButton.waitFor();
        await this.searchButton.click();
        await this.recordFound.waitFor({ timeout: 2000 }).catch(() => {});
        if (await this.recordFound.isVisible()) {
            await this.page.getByText(userDetails.username).waitFor();
            return true;
        }
        return false;
    }

    searchUserAndAddIfNotExist = async (userDetails) => {
        const existUser = await this.searchUser(userDetails);
        if (!existUser) {
            const openSourceAddUserPage = new OpenSourceAdminAddUserPage(this.page);
            await openSourceAddUserPage.addEmployee(userDetails);
        }
    }

    deleteUser = async (userToBeDelete) => {
        const rowText = this.page.getByRole('row', { name: ` ${userToBeDelete.username} ${userToBeDelete.role} ${userToBeDelete.employeeName}` });
        await this.page.getByRole('row', { name: ` ${userToBeDelete.username} ${userToBeDelete.role} ${userToBeDelete.employeeName}` }).locator('span i').click();
        await this.deleteButton.waitFor();
        await this.deleteButton.click();
        await this.deleteButtonYes.waitFor();
        await this.deleteButtonYes.click();
        await expect(rowText).not.toBeVisible();
    }
}
