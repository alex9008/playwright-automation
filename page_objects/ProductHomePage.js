import { expect } from "@playwright/test"
import { Navigation } from "./Navigation.js"
import { isDesktopView } from "../utils/isDesktopView.js"

export class ProductHomePage {

    constructor(page) {
        this.page = page

        this.addButtons = page.locator('[data-qa="product-button"]')
        this.sortSelect = page.locator('[data-qa="sort-dropdown"]')
        this.productPrices = page.locator('[datatype="product-price"]')
    
    }

    visit = async () => {
        await this.page.goto("/")
    }

    addProductToBasket = async (index) => {

        const specificAddButton = this.addButtons.nth(index)
        await specificAddButton.waitFor()
        await expect(specificAddButton).toHaveText("Add to Basket")

        const navigation = new Navigation(this.page)

        // only desktop viewport
        let basketCountBeforeAdding
        if (isDesktopView(this.page)) {
            basketCountBeforeAdding = await navigation.getBasketCount()
        }
        

        await specificAddButton.click()
        await expect(specificAddButton).toHaveText("Remove from Basket")

        let basketCountAfterAdding
        if (isDesktopView(this.page)) {
            basketCountAfterAdding = await navigation.getBasketCount()
            expect(basketCountAfterAdding).toBeGreaterThan(basketCountBeforeAdding)
        }
    }

    sortByCheapest = async () => {
        const currentSort = this.getCurrentSort()
        await this.sortSelect.selectOption({ label: "Price ascending" })
        const newSort = await this.productPrices.allInnerTexts()
        expect(newSort).not.toEqual(currentSort)
        expect(newSort).toEqual(newSort.sort())
    }

    sortByMostExpensive = async () => {
        const currentSort = this.getCurrentSort()
        await this.sortSelect.selectOption({ label: "Price descending" })
        const newSort = await this.productPrices.allInnerTexts()
        expect(newSort).not.toEqual(currentSort)
        expect(newSort).toEqual(newSort.sort().reverse())
    }

    getCurrentSort = async () => {
        await this.sortSelect.waitFor()
        await this.productPrices.first().waitFor()
        const currentSort = await this.productPrices.allInnerTexts()
    }
}