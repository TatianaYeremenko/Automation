import faker, { random } from "faker";

describe("live lesson - ", () => {
  it("student/tutor Lesson Tools: PlayGround is available and working for st", async () => {
    //create tutor
    const t = await createVisitor();

    // sign-in as a tutor
    await t.struct.authPages.signIn.email.waitForVisible();
    await t.struct.authPages.signIn.email.fill
    ("prepandplaydraw@local.tutorme.com");

    await t.struct.authPages.signIn.password.waitForVisible();
    await t.struct.authPages.signIn.password.type("Tutor12345!");

    await t.page.waitForTimeout(2000);
    await fillRecaptcha(t.struct.authPages.signIn.recaptcha);
    await t.page.waitForTimeout(1000);

    await t.struct.authPages.signIn.signIn.waitForVisible();
    await t.struct.authPages.signIn.signIn.click();
    await t.page.waitForTimeout(2000);
    
    // get in the queue
    await (await t.page.waitForSelector('//div[contains(text(),"Enter the tutoring queue?")]')).isVisible();
    await (await t.page.waitForSelector('//div[contains(text(),"Enter the tutoring queue?")]')).click();
    
    //create student
    const s = await createQaUser("studentWithUmbrella");
    const studentId = "" + s.user.id.toString() + "";

    // submit the request
    await s.struct.homepage.requestATutor.waitForVisible();
    await s.struct.homepage.requestATutor.click();

    await s.page.locator('label').filter({ hasText: '5th grade' }).click();
    await s.struct.sessionRequest.nextArrow.click();
  
    await s.page.locator('label').filter({ hasText: 'Math' }).click();
    await s.struct.sessionRequest.nextArrow.click();
  
    await s.page.locator('label').filter({ hasText: 'Basic Math' }).click();
    await s.struct.sessionRequest.nextArrow.click();
  
    await s.page.getByTestId('sessionRequest.description').click();
    await s.page.getByTestId('sessionRequest.description').fill('If y(x-1)=z then x=');
    await s.page.waitForTimeout(2000);

    await s.struct.sessionRequest.nextArrow.click();
    await s.page.waitForTimeout(1000);

    await s.page.locator('label').filter({ hasText: 'I am so lost' }).click();

    await s.page.locator('label').filter({ hasText: 'Audio only' }).click();
    await s.struct.sessionRequest.nextArrow.click();

    // move to the confirmation page
    await s.struct.sessionRequest.codeOfConduct.click();
    await s.struct.sessionRequest.requestTutor.click();
    await s.page.waitForTimeout(1000);

    // PLAY GAME MENUE IS AVALABLE

    //header is dispalyed
    await s.page.getByText('Play a game while you wait!').isVisible();
    await s.page.getByText('Or use the whiteboard to prepare your questions for the tutor').isVisible();

    // games are listed
    expect(await s.struct.lessonSpace.gamePanel.draw.text()).toBe("Draw");
    expect(await s.struct.lessonSpace.gamePanel.wordSearch.text()).toBe("Word search");
    expect(await s.struct.lessonSpace.gamePanel.math.text()).toBe("Speed math");

    // minimalize is working and games are hidden
    await s.struct.lessonSpace.gamePanel.minimize.waitForVisible();
    await s.struct.lessonSpace.gamePanel.minimize.click();

    // games is hidden
    await s.struct.lessonSpace.gamePanel.draw.waitForHidden();
    await s.struct.lessonSpace.gamePanel.wordSearch.waitForHidden();
    await s.struct.lessonSpace.gamePanel.math.waitForHidden();

    // click on minimalize to open the menu
    await s.struct.lessonSpace.gamePanel.minimize.waitForVisible();
    await s.struct.lessonSpace.gamePanel.minimize.click();

     // games are avalable
    await s.struct.lessonSpace.gamePanel.draw.waitForVisible();
    await s.struct.lessonSpace.gamePanel.wordSearch.waitForVisible();
    await s.struct.lessonSpace.gamePanel.math.waitForVisible();

     // DRAW game check
    await s.struct.lessonSpace.gamePanel.draw.waitForVisible();
    await s.struct.lessonSpace.gamePanel.draw.click();

    //Whiteboard tools link is available and working
    await s.struct.lessonSpace.gamePanel.whiteboardtools.waitForVisible();
    // await s.struct.lessonSpace.gamePanel.whiteboardtools.click();

    // Tip Box should show up
    // await s.page.getByText('Use the Line or Freehand tools to circle the words you find in the grid.').isVisible();
    // await (await s.page.waitForSelector('//button[contains(text(),"Got it")]')).click();

    // Students can access examples of drawings
    await s.struct.lessonSpace.whiteboard.items.drawFrame('Draw a castle').waitForVisible();
    await s.struct.lessonSpace.gamePanel.drawingDone.waitForVisible();
    await s.struct.lessonSpace.gamePanel.drawingDone.click();
    await s.page.waitForTimeout(1000);

    // New drawing is available
    await s.struct.lessonSpace.gamePanel.newDrawing.waitForVisible();
    await s.struct.lessonSpace.gamePanel.newDrawing.click();
    await s.struct.lessonSpace.whiteboard.items.drawFrame('Draw a classroom in the sky').waitForVisible();
    await s.page.waitForTimeout(1000);

    // go back to the menu
    await s.struct.lessonSpace.gamePanel.backToGames.waitForVisible();
    await s.struct.lessonSpace.gamePanel.backToGames.click();
    await s.page.waitForTimeout(1000);

    //tutor claims it
    await t.struct.modals.claimLesson.content.claim.waitForVisible();
    await t.struct.modals.claimLesson.content.claim.click();
    await t.page.waitForTimeout(1000);

    await t.struct.modals.firstTime.content.gotIt.waitForVisible();
    await t.struct.modals.firstTime.content.gotIt.click();

    await s.page.waitForTimeout(7000);

    // await t.struct.lessonSpace.header.timerTooltipGotIt.waitForVisible();
    // await t.struct.lessonSpace.header.timerTooltipGotIt.click();

    // check the drawings
    await t.struct.lessonSpace.whiteboardButton.waitForVisible();
    await t.struct.lessonSpace.whiteboardButton.click();

    await t.struct.lessonSpace.whiteboard.board(0).waitForVisible();
    await t.struct.lessonSpace.whiteboard.items.drawFrame('Draw a castle').waitForVisible();
    await t.struct.lessonSpace.whiteboard.items.drawFrame('Draw a classroom in the sky').waitForVisible();
    await t.page.waitForTimeout(5000);

    // student ends the lesson
    await s.struct.lessonSpace.header.end.waitForVisible();
    await s.struct.lessonSpace.header.end.click();

    await s.struct.modals.endLesson.content.end.waitForVisible();
    await s.struct.modals.endLesson.content.end.click();

    await s.struct.modals.somethingWentWrong.content.browseTutors.waitForVisible();
    await s.struct.modals.somethingWentWrong.content.browseTutors.click();

    // click on user menu
    await s.struct.header.userTools.username.click();
    await s.struct.userMenu.signOut.click();

    //tutor return to the dashboard
    await t.struct.modals.somethingWentWrong.content.goToDashboard.waitForVisible();
    await t.struct.modals.somethingWentWrong.content.goToDashboard.click();
    await t.page.waitForTimeout(1000);    

    //tutor signs out
    await t.struct.tutorDashboard.header.userTools.username.click();
    await t.struct.userMenu.signOut.click();
    
  });

});
