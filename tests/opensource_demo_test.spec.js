import { test } from "@playwright/test"
import { OpenSourceLoginPage } from "../page_objects/OpenSourceLoginPage.js"
import { OpenSourceAdminAddUserPage } from "../page_objects/OpenSourceAdminAddUserPage.js"
import { OpenSourceAdminUserManagementPage } from "../page_objects/OpenSourceAdminUserManagementPage.js"
import { openSourceLoginDetails as logingDetails, openSourceUserDetails as  userDetails, openSourceUserDetailsToBeDelete as userToBeDelete} from "../data/userDetails.js"

test("Open Source Demo Test - Login", async ({ page }) => {

    const openSourceLoginPage = new OpenSourceLoginPage(page)
    await openSourceLoginPage.visit()
    await openSourceLoginPage.login(logingDetails)
})

test("Open Source Demo Test - Add Employee", async ({ page }) => {
    
    const openSourceLoginPage = new OpenSourceLoginPage(page)
    await openSourceLoginPage.visit()
    await openSourceLoginPage.login(logingDetails)

    const openSourceAddUserPage = new OpenSourceAdminAddUserPage(page)
    await openSourceAddUserPage.addEmployee(userDetails)
    
})
    
test("Open Source Demo Test - Search Employee", async ({ page }) => {
    
    const openSourceLoginPage = new OpenSourceLoginPage(page)
    await openSourceLoginPage.visit()
    await openSourceLoginPage.login(logingDetails)

    const openSourceSearchUserPage = new OpenSourceAdminUserManagementPage(page)
    await openSourceSearchUserPage.searchUserAndAddIfNotExist(userDetails)
})

test("Open Source Demo Test - Add Employee and delete it", async ({ page }) => {
    
    const openSourceLoginPage = new OpenSourceLoginPage(page)
    await openSourceLoginPage.visit()
    await openSourceLoginPage.login(logingDetails)

    const openSourceAddUserPage = new OpenSourceAdminAddUserPage(page)
    await openSourceAddUserPage.addEmployee(userToBeDelete)
    
    const openSourceSearchUserPage = new OpenSourceAdminUserManagementPage(page)
    await openSourceSearchUserPage.deleteUser(userToBeDelete)
    
})