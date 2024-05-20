import { test } from "@playwright/test"
import { ProductHomePage } from "../page_objects/ProductHomePage.js"
import { Navigation } from "../page_objects/Navigation.js"
import { CheckoutPage } from "../page_objects/CheckoutPage.js"
import { RegisterPage } from "../page_objects/RegisterPage.js"
import { DeliveryDetails } from "../page_objects/DeliveryDetails.js"
import { PaymentPage } from "../page_objects/PaymentPage.js"
import { ThankYouPage } from "../page_objects/ThankYouPage.js"
import { deliveryDetails as userData, deliveryDetails2 as userData2, deliveryDetails3 as userData3 } from "../data/deliveryDetails.js"
import { paymentDetails } from "../data/paymentDetails.js"
import { MyAccountPage } from "../page_objects/MyAccountPage.js"


test("Product Page add two Basket", async ({ page }) => {

  const myAccountPage = new MyAccountPage(page)
  await myAccountPage.visit()

  const productPage = new ProductHomePage(page)
  await productPage.visit()
  await productPage.sortByCheapest()
  await productPage.sortByMostExpensive()
  await productPage.addProductToBasket(0)
  await productPage.addProductToBasket(1)
  await productPage.addProductToBasket(2)

  const navigation = new Navigation(page)
  await navigation.goToCheckout()

  const checkout  = new CheckoutPage(page)
  await checkout.removeCheapestProduct()

  await navigation.goToLogin()
  await navigation.goToRegister()
  
  const register = new RegisterPage(page)
  await register.register(register.generateRandomEmail(), register.generateRandomPassword());

  await navigation.goToDeliveryDetails()

  const deliveryDetails = new DeliveryDetails(page)
  await deliveryDetails.fillDeliveryDetails(userData)
  await deliveryDetails.saveDeliveryDetails()
  await deliveryDetails.continueToPayment()

  const payment = new PaymentPage(page)
  await payment.activateDiscount()

  await payment.fillPaymentDetails(paymentDetails)
  await payment.pay()
  
  const thankYou = new ThankYouPage(page)
  await thankYou.backToShop()

});

