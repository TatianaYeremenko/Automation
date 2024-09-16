import faker, { random } from "faker";
import { product } from "../../lib/shared";

describe("Lesson Connection: ", () => {
  it.each<{
    type: QaUserKind;
  }>([
    {
      type: "studentWithUmbrella",
    },
  ])(
    'when "$type" student closes the lesson window, a tutor should see the Technical Difficulties module and be able to click on End Lesson link',
    async ({ type }) => {
      const s = await createQaUser(type);

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
      const text = `Automation - Lesson submitted from ${product
        .toString()
        .toUpperCase()} ${faker.lorem.sentence(10).toString()}`;
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

      // turon switch on
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

      //student closes the window
      await s.page.close();
      await t.page.waitForTimeout(3000);

      //Technical Difficulties module pops up
      await t.struct.modals.awaitingOpponent.waitForVisible();
      expect(await t.struct.modals.awaitingOpponent.text()).toBe(
        "Please wait...Your student is experiencing technical difficulties.End session"
      );

      await t.struct.modals.awaitingOpponent.content.void.waitForHidden();

      await t.struct.modals.awaitingOpponent.content.end.waitForVisible();
      await t.struct.modals.awaitingOpponent.content.end.click();

      // check past records
      await t.page.reload();
      await t.struct.tutorDashboard.header.pastTutoring.waitForVisible();
      await t.struct.tutorDashboard.header.pastTutoring.click();

      await (
        await t.page.waitForSelector('//a[contains(text(),"View")]')
      ).click();

      // see the discription text
      expect(await t.page.locator('//span[@class="Linkify"]').innerText()).toBe(
        text
      );

      t.struct.pastLessonSpace.header.title.waitForVisible();
      t.struct.pastLessonSpace.header.exit.click();

      // click on user menu
      await t.struct.tutorDashboard.header.userTools.username.click();
      await t.struct.userMenu.signOut.click();
    }
  );
});
