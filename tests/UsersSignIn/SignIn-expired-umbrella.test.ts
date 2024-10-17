

// using page : clean input field, 
//              checking Help Chat Box shows up

import {
    userEmail,
    userPassword,
    invalidPassword,
    wrongFormatEmail,
    invalidEmail
  } from "../../lib/test-config";
  
  describe('A visible message should be displayed if an umbrella account is invalid - ', () => {
  
    it.each `
    type | user | password
    ${'expired umbrella'}| ${'qa-user-expired-umbrella@local.tutorme.com'}| ${'Ff22558800!'},
    ${'used limit hours'}|  ${"qa-user-limit-umbrella@local.tutorme.com"}| ${'Ff22558800!'},
  `
        ('student in == $type umbrella == is not able to login', async ({
            user,
            password
        }) => {
            const {
                struct,
                page
            } = await createVisitor();
  
           //sign in with email   
            //enter email and password
            await struct.authPages.signIn.email.waitForVisible();
            await struct.authPages.signIn.email.type(user);
            await struct.authPages.signIn.password.waitForVisible();
            await struct.authPages.signIn.password.type(password);
  
            //click on Recaptcha
            await struct.authPages.signIn.recaptcha.waitForVisible();
            await fillRecaptcha(struct.authPages.signIn.recaptcha);
            await page.waitForTimeout(200);
  
  
            // click on sign in and wait
            await  struct.authPages.signIn.signIn.waitForVisible(); 
            await  struct.authPages.signIn.signIn.click();
            await page.waitForTimeout(200);
  
            // check validation message
            await struct.modals.umbrellaDisabled.waitForVisible();
            console.log(await struct.modals.umbrellaDisabled.text());
            expect(await struct.modals.umbrellaDisabled.text()).toContain('account has not yet renewed their Pear Deck Tutor access.');
  
        });
      });
  