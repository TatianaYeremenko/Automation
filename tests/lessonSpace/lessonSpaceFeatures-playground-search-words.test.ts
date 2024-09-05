import faker, { random } from "faker";

describe("live lesson - ", () => {
  it("student/tutor Lesson Tools: PlayGround is available and working for st", async () => {
    //create tutor
    const t = await createVisitor();

    // sign-in as a tutor
    await t.struct.authPages.signIn.email.waitForVisible();
    await t.struct.authPages.signIn.email.fill
    ("prepandplaysearchwords@local.tutorme.com");

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

    // SEARCH WORDS game
    await s.struct.lessonSpace.gamePanel.wordSearch.waitForVisible();
    await s.struct.lessonSpace.gamePanel.wordSearch.click();

    // Word Search frame should show up
    await s.struct.lessonSpace.whiteboard.items.wordSearch(0).waitForVisible();

    // check-boxes are there 
    for (let i = 1; i < 8; i++) {
          await s.struct.lessonSpace.gamePanel.wordSearchCheckbox(i).waitForVisible();
    }
    await s.page.waitForTimeout(200);


    // checkboxes are selectable
    await s.page.getByText('Cake').click();
    await s.page.getByText('Cake').isChecked();
    await s.page.getByText('Cake').click();
    await s.page.getByText('Cake').uncheck();
    await s.page.waitForTimeout(200);

    // new search word
    await s.struct.lessonSpace.gamePanel.newWordSearch.waitForVisible();
    await s.struct.lessonSpace.gamePanel.newWordSearch.click();
    await s.page.waitForTimeout(200);

    await s.struct.lessonSpace.whiteboard.items.wordSearch(1).waitForVisible();
    await s.page.waitForTimeout(200);

    // check-boxes are there 
    for (let i = 1; i < 8; i++) {
      await s.struct.lessonSpace.gamePanel.wordSearchCheckbox(i).waitForVisible();
    }
    await s.page.waitForTimeout(200);

    // checkboxes are selectable
    await s.page.getByText('Banana').click();
    await s.page.getByText('Banana').isChecked();
    await s.page.getByText('Banana').click();
    await s.page.getByText('Banana').uncheck();

    // found all words
    await s.struct.lessonSpace.gamePanel.wordSearchDone.waitForVisible();
    await s.struct.lessonSpace.gamePanel.wordSearchDone.click();

    // go back to the menu
    await s.struct.lessonSpace.gamePanel.backToGames.waitForVisible();
    await s.struct.lessonSpace.gamePanel.backToGames.click();
    await s.page.waitForTimeout(200);

    //tutor claims it
    await t.struct.modals.claimLesson.content.claim.waitForVisible();
    await t.struct.modals.claimLesson.content.claim.click();
    await t.page.waitForTimeout(1000);

    await t.struct.modals.firstTime.content.gotIt.waitForVisible();
    await t.struct.modals.firstTime.content.gotIt.click();

    await s.page.waitForTimeout(8000);

    // await t.struct.lessonSpace.header.timerTooltipGotIt.waitForVisible();
    // await t.struct.lessonSpace.header.timerTooltipGotIt.click();

    // check the drawings
    await t.struct.lessonSpace.whiteboardButton.waitForVisible();
    await t.struct.lessonSpace.whiteboardButton.click();

    await t.struct.lessonSpace.whiteboard.board(0).waitForVisible();
    await t.struct.lessonSpace.whiteboard.items.wordSearch(1).waitForVisible();
    await t.struct.lessonSpace.whiteboard.items.wordSearch(0).waitForVisible();
    await t.page.waitForTimeout(3000);

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
