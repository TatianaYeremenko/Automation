import faker, { random } from "faker";

describe("live lesson - ", () => {
  it("student/tutor whiteboard tools are available for both", async () => {
    // connect with a student
    const s = await createQaUser('studentWithUmbrella');

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

    //create tutor
    const t = await createQaUser("tutor");

    // tutor switch on
    await t.page
      .locator('//button[@aria-label="Enter the tutoring queue? off"]')
      .isVisible();
    await t.page
      .locator('//button[@aria-label="Enter the tutoring queue? off"]')
      .click();
    await t.page.waitForTimeout(3000);

    // claim the lesson
    await t.struct.modals.claimLesson.waitForVisible();
    await t.struct.modals.claimLesson.content.claim.click();

    //tutor confirm that a new student
    await t.struct.modals.firstTime.waitForVisible();
    await t.struct.modals.firstTime.content.gotIt.waitForVisible();
    await t.struct.modals.firstTime.content.gotIt.click();

    await t.page.waitForTimeout(10000);

    await t.page
    .locator('//*[@id="react-app"]/div/div[4]/header/div[2]/div[1]/div[2]/div/button')
    .press('Enter');

    // Student's side

    //check the board
    await s.struct.lessonSpace.whiteboard.board(0).waitForVisible();

    // add board
    await s.struct.lessonSpace.whiteboard.addBoard.click();
    // await s.struct.lessonSpace.opponentIcon.waitForVisible();

    await s.struct.lessonSpace.whiteboard.select.waitForVisible();
    await s.struct.lessonSpace.whiteboard.select.click();

    await s.struct.lessonSpace.whiteboard.move.waitForVisible();
    await s.struct.lessonSpace.whiteboard.move.click();

    await s.struct.lessonSpace.whiteboard.line.waitForVisible();
    await s.struct.lessonSpace.whiteboard.line.click();

    await s.struct.lessonSpace.whiteboard.rectangle.waitForVisible();
    await s.struct.lessonSpace.whiteboard.rectangle.click();

    await s.struct.lessonSpace.whiteboard.circle.waitForVisible();
    await s.struct.lessonSpace.whiteboard.circle.click();

    await s.page.waitForTimeout(200);

    // graph tools should show up

    // select stoke
    await s.struct.lessonSpace.whiteboard.stroke.selectBase.click();
    // Click on each
    const selectStokeItems = ["1 px", "2 px", "4 px", "8 px", "16 px", "Plain Stroke", "Dotted Stroke"] as const;
    for (const item of selectStokeItems) {
      await s.struct.lessonSpace.whiteboard.stroke.item(item).click();
      await s.struct.lessonSpace.whiteboard.stroke.selectBase.click();
    }

    await s.struct.lessonSpace.whiteboard.strokeColor.selectBase.click();

    // Click on each
    const selectStokeColors = ["transparent", "#262626", "#545454"] as const;
    for (const item of selectStokeColors) {
      await s.struct.lessonSpace.whiteboard.strokeColor.item(item).click();
      await s.struct.lessonSpace.whiteboard.strokeColor.selectBase.click();
    }

    await s.struct.lessonSpace.whiteboard.fillColor.selectBase.click();

    for (const item of selectStokeColors) {
      await s.struct.lessonSpace.whiteboard.fillColor.item(item).click();
      await s.struct.lessonSpace.whiteboard.fillColor.selectBase.click();
    }

    await s.struct.lessonSpace.whiteboard.freehand.waitForVisible();
    await s.struct.lessonSpace.whiteboard.freehand.click();

    await s.struct.lessonSpace.whiteboard.textbox.waitForVisible();
    await s.struct.lessonSpace.whiteboard.textbox.click();

    //fontcolors should show up
    await s.struct.lessonSpace.whiteboard.fontColor.selectBase.click();

    for (const item of selectStokeColors) {
      await s.struct.lessonSpace.whiteboard.fontColor.item(item).click();
      await s.struct.lessonSpace.whiteboard.fontColor.selectBase.click();
    }

    await s.struct.lessonSpace.whiteboard.font.selectBase.click();

    // Click on each
    const selectFonts = ["monospace", "sans-serif", "serif"] as const;

    for (const item of selectFonts) {
      await s.struct.lessonSpace.whiteboard.font.item(item).click();
      await s.struct.lessonSpace.whiteboard.font.selectBase.click();
    }

    await s.struct.lessonSpace.whiteboard.fontSize.selectBase.click();

    // Click on each
    const selectSizes = [
      "9",
      "10",
      "11",
      "12",
      "14",
      "16",
      "24",
      "30",
      "36",
      "48",
      "60",
      "72",
      "96",
    ] as const;

    for (const item of selectSizes) {
      await s.struct.lessonSpace.whiteboard.fontSize.item(item).click();
      await s.struct.lessonSpace.whiteboard.fontSize.selectBase.click();
    }

    await s.struct.lessonSpace.whiteboard.math.waitForVisible();
    await s.struct.lessonSpace.whiteboard.math.click();

    await s.struct.lessonSpace.whiteboard.strokeColor.selectBase.click();

    // Click on each

    for (const item of selectStokeColors) {
      await s.struct.lessonSpace.whiteboard.strokeColor.item(item).click();
      await s.struct.lessonSpace.whiteboard.strokeColor.selectBase.click();
    }

    await s.struct.lessonSpace.whiteboard.graph.waitForVisible();
    await s.struct.lessonSpace.whiteboard.graph.click();

    await s.struct.lessonSpace.whiteboard.strokeColor.selectBase.waitForHidden();
    await s.struct.lessonSpace.whiteboard.font.selectBase.waitForHidden();
    await s.struct.lessonSpace.whiteboard.fontSize.selectBase.waitForHidden();

    await s.struct.lessonSpace.whiteboard.shorcuts.waitForVisible();
    await s.struct.lessonSpace.whiteboard.shorcuts.click();
    await s.struct.modals.shortcuts.content.close.click();

    await s.struct.lessonSpace.whiteboard.grid.selectBase.waitForVisible();

    await s.page.waitForTimeout(100);

    // Click on each
    const selectBaseItems = ["GRID_OFF", "GRID_8", "GRID_16"] as const;
    for (const item of selectBaseItems) {
      await s.struct.lessonSpace.whiteboard.grid.selectBase.click();
      await s.struct.lessonSpace.whiteboard.grid.item(item).click();
    }

    // Tutor's side

    // check the session plan
    await t.struct.lessonSpace.sessionPlanButton.waitForVisible();
    await t.struct.lessonSpace.sessionPlanButton.click();

    await t.struct.lessonSpace.sessionPlan.raiseGoals('raiseRapport').waitForVisible();
    await t.struct.lessonSpace.sessionPlan.raiseGoals('raiseRapport').click();

    // add board
    await t.struct.lessonSpace.whiteboardButton.waitForVisible();
    await t.struct.lessonSpace.whiteboardButton.click();

    await t.struct.lessonSpace.whiteboard.addBoard.click();
    // await s.struct.lessonSpace.whiteboardButton.waitForVisible();

    await t.struct.lessonSpace.whiteboard.select.waitForVisible();
    await t.struct.lessonSpace.whiteboard.select.click();

    await t.struct.lessonSpace.whiteboard.move.waitForVisible();
    await t.struct.lessonSpace.whiteboard.move.click();

    await t.struct.lessonSpace.whiteboard.line.waitForVisible();
    await t.struct.lessonSpace.whiteboard.line.click();

    await t.struct.lessonSpace.whiteboard.rectangle.waitForVisible();
    await t.struct.lessonSpace.whiteboard.rectangle.click();

    await t.struct.lessonSpace.whiteboard.circle.waitForVisible();
    await t.struct.lessonSpace.whiteboard.circle.click();

    await t.page.waitForTimeout(200);

    // graph tools should show up

    // select stoke
    await t.struct.lessonSpace.whiteboard.stroke.selectBase.click();

    // Click on each
    for (const item of selectStokeItems) {
      await t.struct.lessonSpace.whiteboard.stroke.item(item).click();
      await t.struct.lessonSpace.whiteboard.stroke.selectBase.click();
    }

    await t.struct.lessonSpace.whiteboard.strokeColor.selectBase.click();

    // Click on each
    for (const item of selectStokeColors) {
      await t.struct.lessonSpace.whiteboard.strokeColor.item(item).click();
      await t.struct.lessonSpace.whiteboard.strokeColor.selectBase.click();
    }

    await t.struct.lessonSpace.whiteboard.fillColor.selectBase.click();

    for (const item of selectStokeColors) {
      await t.struct.lessonSpace.whiteboard.fillColor.item(item).click();
      await t.struct.lessonSpace.whiteboard.fillColor.selectBase.click();
    }

    await t.struct.lessonSpace.whiteboard.freehand.waitForVisible();
    await t.struct.lessonSpace.whiteboard.freehand.click();

    await t.struct.lessonSpace.whiteboard.textbox.waitForVisible();
    await t.struct.lessonSpace.whiteboard.textbox.click();

    //fontcolors should show up
    await t.struct.lessonSpace.whiteboard.fontColor.selectBase.click();

    for (const item of selectStokeColors) {
      await t.struct.lessonSpace.whiteboard.fontColor.item(item).click();
      await t.struct.lessonSpace.whiteboard.fontColor.selectBase.click();
    }

    await t.struct.lessonSpace.whiteboard.font.selectBase.click();

    // Click on each
    for (const item of selectFonts) {
      await t.struct.lessonSpace.whiteboard.font.item(item).click();
      await t.struct.lessonSpace.whiteboard.font.selectBase.click();
    }

    await t.struct.lessonSpace.whiteboard.fontSize.selectBase.click();

    // Click on each
    for (const item of selectSizes) {
      await t.struct.lessonSpace.whiteboard.fontSize.item(item).click();
      await t.struct.lessonSpace.whiteboard.fontSize.selectBase.click();
    }

    await t.struct.lessonSpace.whiteboard.math.waitForVisible();
    await t.struct.lessonSpace.whiteboard.math.click();

    await t.struct.lessonSpace.whiteboard.strokeColor.selectBase.click();

    // Click on each

    for (const item of selectStokeColors) {
      await t.struct.lessonSpace.whiteboard.strokeColor.item(item).click();
      await t.struct.lessonSpace.whiteboard.strokeColor.selectBase.click();
    }

    await t.struct.lessonSpace.whiteboard.graph.waitForVisible();
    await t.struct.lessonSpace.whiteboard.graph.click();

    await t.struct.lessonSpace.whiteboard.strokeColor.selectBase.waitForHidden();
    await t.struct.lessonSpace.whiteboard.font.selectBase.waitForHidden();
    await t.struct.lessonSpace.whiteboard.fontSize.selectBase.waitForHidden();

    await t.struct.lessonSpace.whiteboard.shorcuts.waitForVisible();
    await t.struct.lessonSpace.whiteboard.shorcuts.click();
    await t.struct.modals.shortcuts.content.close.click();

    await t.struct.lessonSpace.whiteboard.grid.selectBase.waitForVisible();

    await t.page.waitForTimeout(100);

    // Click on each
    for (const item of selectBaseItems) {
      await t.struct.lessonSpace.whiteboard.grid.selectBase.click();
      await t.struct.lessonSpace.whiteboard.grid.item(item).click();
    }

    //end the lesson
    await t.struct.lessonSpace.header.end.waitForHidden();
    await s.struct.lessonSpace.header.end.waitForVisible();
    await s.struct.lessonSpace.header.end.click();

    await s.struct.modals.endLesson.content.end.waitForVisible();
    await s.struct.modals.endLesson.content.cancel.waitForVisible();
    await s.struct.modals.endLesson.content.close.waitForVisible();
    await s.struct.modals.endLesson.content.end.click();

    //student return to the dashboard
    await s.struct.modals.somethingWentWrong.content.browseTutors.waitForVisible();
    await s.struct.modals.somethingWentWrong.content.browseTutors.click();
    await s.page.waitForTimeout(2000);

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
