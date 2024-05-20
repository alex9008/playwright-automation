import { test } from "@playwright/test"
import { MyAccountPage } from "../page_objects/MyAccountPage.js"
import { getLoginToken } from "../api-calls/getLoginToken.js"
import { adminDetails } from "../data/userDetails.js"

test("My Account using cookie injection", async ({ page }) => {
    // Make a request o get a login token
    const token = await getLoginToken(adminDetails.username, adminDetails.password)

    await page.route('**/api/user**', async (route) => {
        await route.fulfill({
            status: 500,
            contentType: 'application/json',
            body: JSON.stringify({message: 'Playwright error from mock server'})
        })
    })

    const myAccountPage = new MyAccountPage(page)
    await myAccountPage.visit()
    // Inject the token as a cookie
    await page.context().addCookies([
        { name: 'token', value: token, domain: 'localhost', path: '/my-account' }
    ])

    // // Injected the token as a cookie using evaluate function
    // await page.evaluate(([loginTokenInsideBrowserCode]) => {
    //     document.cookie = "token=" + loginTokenInsideBrowserCode
    // }, [token])

    await myAccountPage.visit()
    await myAccountPage.waitForPageHeading()
    await myAccountPage.getErrorMessages()

})