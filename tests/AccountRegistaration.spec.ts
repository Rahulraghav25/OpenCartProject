/**
 * Account Registration Test Suite
 * 
 * Tags : @master @Sanity @Regression
 * 
 * This test suite verifies the account registration functionality of the application.
 * It includes tests for successful registration, validation errors, and edge cases.    
 * Steps:
 * 1. Navigate to App URL
 * 2. Go to My Account -> click Register
 * 3. Fill in the registration form with random data
 * 4. Agree to privacy policy and click submit
 * 5. Verify that the registration is successful by checking the confirmation message
 */

import {test, expect} from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { RandomDataUtil } from '../utils/randomDataGenerator';
import { TestConfig } from '../test.config';
let homePage: HomePage;
let registrationPage: RegistrationPage;
test.beforeEach(async({page}) => {
   // Step 1: Navigate to App URL
    const config = new TestConfig();
    await page.goto(config.appUrl);
    homePage = new HomePage(page);
    registrationPage = new RegistrationPage(page);
})
test.afterEach(async ({page}) => {
    await page.close();
})

test ('Account Registration Test', async({page})=>{
   
    // Step 2: Go to My Account -> click Register
    
    await homePage.clickMyAccount();
    await homePage.clickRegister();
    // Step 3: Fill in the registration form with random data
    await registrationPage.setFirstName(RandomDataUtil.getFirstName());
    await registrationPage.setLastName(RandomDataUtil.getlastName());
    await registrationPage.setEmail(RandomDataUtil.getEmail());
    await registrationPage.setTelephone(RandomDataUtil.getPhoneNumber());
    const password = RandomDataUtil.getPassword();
    await registrationPage.setPassword(password);
    await registrationPage.setConfirmPassword(password);
    // Step 4: Agree to privacy policy and click submit
    await registrationPage.setPrivacyPolicy();
    await registrationPage.clickContinue();
    // Step 5: Verify that the registration is successful by checking the confirmation message
    const confirmationMsg = await registrationPage.getConfirmationMsg();
    expect(confirmationMsg).toContain('Your Account Has Been Created!');

    await page.waitForTimeout(3000); // Wait for 3 seconds to observe the result before closing the browser
})
