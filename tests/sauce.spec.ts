import {test , expect} from '@playwright/test';
import {loginpage} from '../pages/loginpage';
import {inventorypage} from '../pages/inventorypage';
import {cartpage} from '../pages/cartpage';
import {checkoutpage} from '../pages/checkoutpage';
import *  as testdata from '../data/testdata.json';

let LoginPage: loginpage;
let InventoryPage: inventorypage;
let CartPage: cartpage;
let CheckoutPage: checkoutpage;

    test.beforeEach(async ({ page }) => {

        LoginPage = new loginpage(page);
        InventoryPage = new inventorypage(page);
        CartPage = new cartpage(page);
        CheckoutPage = new checkoutpage(page);

        await LoginPage.navigate();

    });

    // PAGE 1: LOGIN LANDING PAGE TESTS (5 Test Cases)
    test.describe('Module 1 - Login Page Validations', () => {

        test('TC01: Successful Login with Valid Credentials', async ({ page }) => {

            await LoginPage.login(
                testdata.validuser,
                testdata.validpasswor
            );
            await expect(page).toHaveURL('inventory.html');
        });

        test('TC02: Login Failure with Invalid Credentials', async () => {

            await LoginPage.login(
                testdata.invaliduser,
                'wrong_pass'
            );
            await expect(LoginPage.errormessage).toBeVisible();
            await expect(LoginPage.errormessage)
                .toHaveText(/Username and password do not match/);
        });

        test('TC03: Login Failure with Locked Out User Profile', async () => {
            await LoginPage.login(
                testdata.lockeduser,
                testdata.validpasswor
            );
            await expect(LoginPage.errormessage).toBeVisible();
            await expect(LoginPage.errormessage).toHaveText(/Sorry, this user has been locked out/);
        });

    test('tc04: login validation error when password field is empty' async () => {
        await LoginPage.usernameinput.fill(testdata.validuser);
        await LoginPage.loginbutton.click();
        await expect (LoginPage.errormessage).toHaveText(/Password is required/);
    });

    test('tc05: verficition of visual placehoilder fields avaliblity', async () =>{
        await expect(LoginPage.usernameinput).toHaveAttribute('placeholder','username');
        await expect(LoginPage.passwordinput).toHaveAttribute('placeholder','password');
    });
});
//page 2: inventory catalog page test(5 test cases)

test.describe('modeule 2 - inventory catalog validation', () =>{
    test.beforeEach(async()=>{
        await LoginPage.login(testdata.validuser,testdata.validpasswor);
    });

    test('tc06: verfiy title header exist on landing page', async()=>{
        await expect(InventoryPage.pageTitle).toBeVisible();
        await expect(InventoryPage.pageTitle).toHaveText('Products');
    });
    test('tc07: adding single in the cart', async()=>{
        await InventoryPage.addProductToCart(testdata.products.backpack);
        await expect(InventoryPage.cartIcon).toHaveText('1');
    });
    
    test('tc08: remove the item from cart', async(){
        await InventoryPage.addProductToCart(testdata.products.backpack)
        await InventoryPage.removeProductFromCart(testdata.products.backpack)
        await expect(InventoryPage.cartIcon).not.toBeVisible();
    });

    test('tc09: add multiple item in cart' , async(){
        await InventoryPage.addProductToCart(testdata.products.backpack)
        await InventoryPage.addProductToCart(testdata.products.bikelight)
        await expect(InventoryPage.cartIcon).toHaveText('2');
    });

    test('tc10: successful session logout from burger drawer link navigation', async({page}){
        await InventoryPage.logout();
        await expect (page).toHaveURL('https://www.saucedemo.com/')
    });
});
//shopping cart priview page (5 test cases)
    test.describe('modeule 2 - inventory catalog validation', () =>{
    test.beforeEach(async()=>{
        await LoginPage.login(testdata.validuser,testdata.validpasswor);
    });

    test('tc11: navigate to cart page through carticon', async({page}) => {
        await InventoryPage.openCart();
        await expect(page).toHaveURL('/cart.html');
     });

    test('tc12: product info transfer clenly to the cart inventory item in array lint' ,async () => {
        await InventoryPage.addProductToCart(testdata.products.backpack);
        await InventoryPage.openCart();
        await expect(CartPage.cartitems).toHaveCount(1);

 });

      test('tc13: ability to drop item  directly  from inside the cart component review section', async() =>{
        await InventoryPage.addProductToCart(testdata.products.backpack);
        await InventoryPage.openCart();
        await CartPage.removeButton.click();
 });

      test('tc14: continue  shopping action exucation  focus safely back to product list catalog', async({page}) =>{
        await InventoryPage.addProductToCart(testdata.products.backpack);
        await InventoryPage.openCart();
        await CartPage.clickCheckout();
        await expect(page).toHaveURL('/checkout-step-one.html');
      });
});
// checkout  processor  page  tests ( 5 test cases)

test.describe('checkout flow  process validation' , async() => {
    test.beforeEach(async()=>{
        await LoginPage.login(testdata.validuser,testdata.validpasswor);
        await InventoryPage.addProductToCart(testdata.products.backpack);
        await InventoryPage.openCart();
        await CartPage.clickCheckout();
    });

    test('tc15: form validation required if first name i missing' , async() => {
        await CheckoutPage.lastname.fill(testdata.coustomerdetails.lname);
        await CheckoutPage.zipcode.fill(testdata.coustomerdetails.zipcode);
        await CheckoutPage.continueButton.click();
        await expect(CheckoutPage.page.locator('[data-test="error"]')).toHaveText(/Error: first name is required/);

    });

    test('tc17: complete dilvery validation maps to review step two' , async ({page}) => {
        await CheckoutPage.fillcoustomerinfo(testdata.coustomerdetails.fname,testdata.coustomerdetails.lname,testdata.coustomerdetails.zipcode);
        await expect(page).toHaveURL('/checkout-step-two.tml');
    });


    test ('tc18: financal total price calculatiuon summary deatils prsence verfication' , async () =>{
         await CheckoutPage.fillcoustomerinfo(testdata.coustomerdetails.fname,testdata.coustomerdetails.lname,testdata.coustomerdetails.zipcode);
         await expect(CheckoutPage.summarytotal).toBeVisible();
         await expect(CheckoutPage.summarytotal).toContainText('Total: $');
    });

    test ('tc19: successful oder confirmation' , async () =>{
         await CheckoutPage.fillcoustomerinfo(testdata.coustomerdetails.fname,testdata.coustomerdetails.lname,testdata.coustomerdetails.zipcode);
         await CheckoutPage.clickfinish();
         await expect(CheckoutPage.completeheader).toHaveText('Thank you for your order!');
    });

    test ('tc20 : after order configration go back to product page' , async({page}){

         await CheckoutPage.fillcoustomerinfo(testdata.coustomerdetails.fname,testdata.coustomerdetails.lname,testdata.coustomerdetails.zipcode);
         await CheckoutPage.clickfinish();
         await page.locator('[data-test="back-to-products"]').click();
         await expect(page).toHaveURL('/inventory.html');
            });
    });