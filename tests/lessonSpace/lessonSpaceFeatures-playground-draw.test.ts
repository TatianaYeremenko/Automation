import faker, { random } from "faker";

describe("live lesson - ", () => {
  it("student/tutor Lesson Tools: PlayGround is available and working for st", async () => {
    //create tutor
    const s = await createQaUser('studentWithUmbrella');
    const t = await createQaTutor();

    //request Publict Request

    await s.struct.homepage.requestATutor.waitForVisible();
    await s.struct.homepage.requestATutor.click();
    await s.page.waitForTimeout(200);

    // select subject
    await s.page.getByText("Kindergarten").click();
    await s.page.waitForTimeout(200);

    await s.struct.sessionRequest.nextArrow.click();
    await s.page.waitForTimeout(200);

    await s.page.locator("label").filter({ hasText: "Math" }).click();
    await s.page.waitForTimeout(200);

    await s.struct.sessionRequest.nextArrow.click();
    await s.page.waitForTimeout(200);

    await s.page.locator("label").filter({ hasText: "Basic Math" }).click();
    await s.page.waitForTimeout(200);

    await s.struct.sessionRequest.nextArrow.click();
    await s.page.waitForTimeout(200);

    // fill out the form
    const text = `Automation - Lesson submitted from  ${faker.lorem.sentence(10).toString()}`;
    await s.struct.sessionRequest.description.fill(text);
    await s.struct.sessionRequest.nextArrow.click();
    await s.page.waitForTimeout(200);

    await s.page
      .locator("label")
      .filter({ hasText: "I'm starting to get it" })
      .locator("svg")
      .click();
    await s.page.waitForTimeout(200);

    await s.page.locator("label").filter({ hasText: "Audio only" }).click();
    await s.struct.sessionRequest.next.click();
    await s.page.waitForTimeout(200);

    await s.struct.sessionRequest.codeOfConduct.click();
    await s.struct.sessionRequest.requestTutor.click();
    await s.page.waitForTimeout(200);

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

    // tutor switch on
    await t.page
      .locator('//button[@aria-label="Enter the tutoring queue? off"]')
      .isVisible();
    await t.page
      .locator('//button[@aria-label="Enter the tutoring queue? off"]')
      .click();
    await t.page.waitForTimeout(3000);

    await t.struct.modals.claimLesson.content.claim.waitForVisible();
    await t.struct.modals.claimLesson.content.claim.click();
    await t.page.waitForTimeout(1000);

    await t.struct.modals.firstTime.content.gotIt.waitForVisible();
    await t.struct.modals.firstTime.content.gotIt.click();

    await s.page.waitForTimeout(7000);

    await t.page
    .locator('//*[@id="react-app"]/div/div[4]/header/div[2]/div[1]/div[2]/div/button')
    .press('Enter');


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
