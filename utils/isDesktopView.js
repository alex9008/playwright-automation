export const isDesktopView = (page) => {
    const size = page.viewportSize()
    return size.width >= 600
}