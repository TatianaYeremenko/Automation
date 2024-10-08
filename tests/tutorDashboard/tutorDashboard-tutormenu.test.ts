it("Tutor Dashboard Menu looks good", async () => {

    //create tutor
    const {
        struct,
        page,
        user
    } =  await createQaTutor();

    await page.waitForTimeout(1000);
    await page.setViewportSize({ width: 1920, height: 1080 });


    // check TutorMe logo
    await (await page.waitForSelector('//div[contains(text(),"Formerly TutorMe")]')).isVisible();

    // check messageging
    await struct.tutorDashboard.header.notifications.chat.button.waitForVisible();
    await struct.tutorDashboard.header.notifications.chat.button.click();


    // check notification
    await struct.header.notifications.tutorResources.button.waitForVisible();
    await struct.header.notifications.tutorResources.button.click();
    await struct.header.notifications.tutorResources.button.click();

    // check pastTutoring
    await struct.tutorDashboard.header.pastTutoring.waitForVisible();
    await struct.tutorDashboard.header.pastTutoring.click();

    // check availableTutoring
    await struct.tutorDashboard.header.availableTutoring.waitForVisible();
    await struct.tutorDashboard.header.availableTutoring.click();

    // check earnings
    await struct.tutorDashboard.header.earnings.waitForVisible();
    await struct.tutorDashboard.header.earnings.click();

    // check Background check
    await struct.tutorDashboard.header.checkr.waitForVisible();
    await struct.tutorDashboard.header.checkr.click();
 
    // check resources check
    await struct.tutorDashboard.header.resources.waitForVisible();
    await struct.tutorDashboard.header.resources.click();

    // check demo
    await struct.tutorDashboard.header.demoLessonSpace.waitForVisible();
    await struct.tutorDashboard.header.demoLessonSpace.click();
    await page.waitForTimeout(500);
    await struct.demoLessonSpace.header.exit.waitForVisible();
    await struct.demoLessonSpace.header.exit.click();

    // check help center
    await struct.tutorDashboard.header.helpCenter.waitForVisible();

    //check user menu
    await struct.tutorDashboard.header.userTools.username.waitForVisible();
    await struct.tutorDashboard.header.userTools.username.click();

    await struct.userMenu.myAccount.waitForVisible();
    await struct.userMenu.editProfile.waitForVisible();
    await struct.userMenu.switch.waitForVisible();
    // await struct.userMenu.installTutormeDesktop.waitForVisible();
    
    //tutor signs out
    await struct.userMenu.signOut.waitForVisible();
    await struct.userMenu.signOut.click();

});
