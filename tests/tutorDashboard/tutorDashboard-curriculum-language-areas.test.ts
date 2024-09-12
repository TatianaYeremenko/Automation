
it("Subjects Page is available and tutors can able to edit it and save", async () => {
  //create tutor
  const { struct, page, user } =  await createQaTutor();


  await page.waitForTimeout(1000);
  await page.setViewportSize({ width: 1920, height: 1080 });

  // click on Edit Profile
  await struct.tutorDashboard.header.userTools.username.waitForVisible();
  await struct.tutorDashboard.header.userTools.username.click();

  await struct.userMenu.editProfile.waitForVisible();
  await struct.userMenu.editProfile.click();

  await page.waitForTimeout(500);

  //check Curriculum Area
  await page.getByRole("link", { name: "Subjects and Skills" }).click();
  await page.keyboard.press("PageDown");

  await struct.account.subjects.subject(10002).waitForVisible();
  expect(await struct.account.subjects.subject(10002).isChecked()).toBeTruthy();

  // clcik on Basic Math
  await struct.account.subjects.subject(10002).click();
  expect(await struct.account.subjects.subject(10002).isChecked()).not.toBeTruthy();

  

  // check the information
  await (
    await page.waitForSelector(
      '//div[contains(text(),"If you wish to add subjects that are currently disabled on your profile, please contact the")]'
    )
  ).isVisible();

  // check support team link
  await page.getByRole('button', { name: 'support team' }).click();
  await page.frameLocator('iframe[name="intercom-messenger-frame"]').getByRole('button', { name: 'Send us a message' }).click();
  await page.frameLocator('iframe[name="intercom-messenger-frame"]').getByPlaceholder('Message…').fill('help');
  await page.frameLocator('iframe[name="intercom-messenger-frame"]').getByPlaceholder('Message…').press('Enter');
  await page.waitForTimeout(2000);
  await page.locator('//div[contains(text(),"get replies")]').isVisible();
  await page.frameLocator('iframe[name="intercom-launcher-frame"]').getByTestId('launcher-with-badge-cutout-none').click();

    // submit the changes
    await struct.account.subjects.save.waitForVisible();
    await struct.account.subjects.save.click();

    await page.waitForTimeout(2000);

    // confirm the changes
    await struct.toast.success.waitForVisible();
 
    //tutor signs out
    await struct.tutorDashboard.header.userTools.openMenu.click();
    await struct.userMenu.signOut.click();
});
