import faker, { random } from "faker";

describe("live lesson - ", () => {
  it("Session Plan is available for a tutor", async () => {

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

    // CHECK session plan
    // the session plan should not be available for student
    await s.struct.lessonSpace.sessionPlanButton.waitForHidden();

    // check the session plan
    await t.struct.lessonSpace.sessionPlan.raiseLink.waitForVisible();
    
    await t.struct.lessonSpace.sessionPlan.raiseGoals('raiseRapport').waitForVisible();
    await t.struct.lessonSpace.sessionPlan.raiseGoals('raiseRapport').click();

    await t.struct.lessonSpace.sessionPlan.raiseGoals('raiseAssessKnowledge').waitForVisible();
    await t.struct.lessonSpace.sessionPlan.raiseGoals('raiseAssessKnowledge').click();

    await t.struct.lessonSpace.sessionPlan.raiseGoals('raiseIndividualize').waitForVisible();
    await t.struct.lessonSpace.sessionPlan.raiseGoals('raiseIndividualize').click();

    await t.struct.lessonSpace.sessionPlan.raiseGoals('raiseSummarize').waitForVisible();
    await t.struct.lessonSpace.sessionPlan.raiseGoals('raiseSummarize').click();

    await t.struct.lessonSpace.sessionPlan.raiseGoals('raiseEncouragement').waitForVisible();
    await t.struct.lessonSpace.sessionPlan.raiseGoals('raiseEncouragement').click();

    await t.struct.lessonSpace.whiteboardButton.waitForVisible();
    await t.struct.lessonSpace.whiteboardButton.click();

    await t.struct.lessonSpace.sessionDetails.sessionPlanLink.waitForVisible();
    await t.struct.lessonSpace.sessionDetails.sessionPlanLink.click(); 

    await t.page.locator('//h2[contains(text(),"Session Plan")]').isVisible();

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
