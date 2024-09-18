import faker, { random } from "faker";
import { readFileSync } from "fs";
import { max } from "lodash";
import { number } from "zod";

describe("live lesson - ", () => {
  it("student/tutor Void Survey is available ", async () => {
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

    // tutor click on Pause
    await t.struct.lessonSpace.header.pause.click();

    // pop-ups appears
    await t.struct.modals.pauseLesson.waitForVisible();

    // click on Resume Lesson
    await t.struct.modals.pauseLesson.content.resume.click();

    // click on void
    await t.struct.lessonSpace.header.void.click();

    //return back to the lesson
    await t.struct.modals.voidLesson.content.returnToLesson.waitForVisible();
    await t.struct.modals.voidLesson.content.returnToLesson.click();

    // click on void again
    await t.struct.lessonSpace.header.void.click();

    // five reasons should be available
    await t.page
      .locator("label")
      .filter({ hasText: "The student’s request didn’t make sense." })
      .locator("svg")
      .click();
    await t.page
      .locator("label")
      .filter({ hasText: "The student or I had technical difficulties." })
      .locator("svg")
      .click();
    await t.page
      .locator("label")
      .filter({ hasText: "The student behaved inappropriately." })
      .locator("svg")
      .click();
    await t.page
      .locator("label")
      .filter({
        hasText:
          "The student asked for help with an exam/test/quiz (Academic Dishonesty).",
      })
      .locator("svg")
      .click();
    await t.page
      .locator("label")
      .filter({ hasText: "Other, please explain below." })
      .locator("svg")
      .click();
    await t.page.getByTestId("modals.voidLesson.content.comments").click();
    await t.page
      .getByTestId("modals.voidLesson.content.comments")
      .fill("testing here");
    await t.page.waitForTimeout(500);
    await t.page.getByRole("button", { name: "Void session" }).press("Enter");
    await t.page
      .getByTestId("tutorDashboard.header.userTools.openMenu")
      .click();
    await t.page.getByTestId("userMenu.signOut").click();
  });
});
