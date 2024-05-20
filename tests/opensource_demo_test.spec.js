import { test } from "@playwright/test"
import { OpenSourceLoginPage } from "../page_objects/OpenSourceLoginPage"
import { openSourceUserDetails as userDetails } from "../data/userDetails.js"

test("Open Source Demo Test - Login", async ({ page }) => {

    const openSourceLoginPage = new OpenSourceLoginPage(page)
    await openSourceLoginPage.visit()
    await openSourceLoginPage.login(userDetails)
})