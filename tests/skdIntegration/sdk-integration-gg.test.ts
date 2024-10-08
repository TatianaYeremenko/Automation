import faker, { random } from "faker";
import { product } from "../../lib/shared";
describe("Checking SDK GG integration: ", () => {
  const teacherFirstName = faker.name.firstName(1);
  const teacherLastName = faker.name.lastName();
  const teacherFullName = `${teacherFirstName}  ${teacherLastName}`;
  const email = `${teacherFirstName.toLowerCase()}.gg.teacher@local.peardeck.tutor.com`;
  const studentEmai = "gg-teacher-qa-user-001@local.tutorme.com";
  const studentPassword = "SDK12345";
  // const tutorEmai = "shermanswaniawskitutor@local.tutorme.com";
  // const tutorPassword = "Tutor12345!";

  it("Submit GG Teacher tutoring request", async () => {
    const { struct, page } = await createVisitor();
    await page.goto("https://react-tutorme.tutorme.dev/");

    await page.getByPlaceholder("Name- required").type(teacherFullName);
    await page.getByPlaceholder("Email- required").type(email);
    await page.getByPlaceholder("External ID- optional").isVisible();
    await page
      .getByPlaceholder("API url- optional")
      .fill("https://stg-tutor.peardeck.com/api/v1/sdk");

    await page.getByPlaceholder("Umbrella Org- use for GGT").type("1");
    await page.getByPlaceholder("Umbrella Account- use for GGT").type("671308");
    await page
      .getByPlaceholder("Umbrella Secret- use for GGT")
      .type("GGT_TEACHER");

    await page.getByRole("button", { name: "Add a student" }).click();
    await page.waitForTimeout(1000);

    await page.getByPlaceholder("Student #1 first name").fill("Judy");
    await page.getByPlaceholder("Student #1 last name").fill("Gold");
    await page
      .getByPlaceholder("Student #1 email")
      .type("gg-teacher-qa-user-001@local.tutorme.com");

    await page.getByTestId("formSubmitButton").click();
    await page.waitForTimeout(2000);

    await page.locator('//button[contains(text(),"Assign Tutoring")]').click();
    await page.waitForTimeout(2000);

    await page.locator('//div[contains(text(),"Select grade")]').click();
    await page.getByRole("option", { name: "1st grade" }).click();
    await page.waitForTimeout(1000);

    await page.locator("label").filter({ hasText: "Math" }).click();
    await page.waitForTimeout(1000);

    await page.locator('//button[contains(text(),"Next")]').click();
    await page.waitForTimeout(1000);

    await page.locator('//span[contains(text(),"Basic Math")]').click();
    await page.waitForTimeout(1000);

    await page.locator('//button[contains(text(),"Next")]').click();
    await page.waitForTimeout(1000);

    await page
      .locator('//textarea[@name="description"]')
      .type("Automation - submitting the teacher request");

    await page
      .locator('//input[@name="files"]')
      .setInputFiles("./lib/files/example_1.gif");
    await page.waitForTimeout(3000);
    await page.locator('//button[contains(text(),"Submit")]').click();
    await page.waitForTimeout(1000);
    await page.locator('//button[contains(text(),"Copy and close")]').click();
    await page.waitForTimeout(1000);

    // const sdk_url= await page.locator('//div[button[contains(text(),"Copy link")]]').innerText();
    // console.log(sdk_url.toString().slice(0,-9));
  });
  it("Student receives GG teacher tutoring request and able to connect to a tutor", async () => {
    // create tutor
    const t = await createQaTutor();

    // create tutor
    const s = await createVisitor();

    // the student signs in
    await s.struct.authPages.signIn.email.waitForVisible();
    await s.struct.authPages.signIn.email.fill(studentEmai.toLowerCase());

    await s.struct.authPages.signIn.password.waitForVisible();
    await s.struct.authPages.signIn.password.type(studentPassword);

    await s.page.waitForTimeout(1000);
    await fillRecaptcha(s.struct.authPages.signIn.recaptcha);
    await s.page.waitForTimeout(1000);

    await s.struct.authPages.signIn.signIn.waitForVisible();
    await s.struct.authPages.signIn.signIn.click();
    await s.page.waitForTimeout(3000);

    // the tutor signs in

    //click the latest one
    // const lists = await s.page.$$(
    //   '//div[@id="notificationsMenuButton"]'
    // );
    // lists[0].click();
    await s.struct.header.notifications.other.button.click();

    await s.page
      .locator('//button[contains(text(),"Ready for a live session!")]')
      .isVisible();
    await s.page
      .locator('//button[contains(text(),"Ready for a live session!")]')
      .click();
    await s.page.waitForTimeout(1000);

    // the tutor signs in
    await s.page.waitForTimeout(1000);
    // a tutor get in the queue
    await t.page
      .locator('//button[@aria-label="Enter the queue? off"]')
      .click();
    await t.page.waitForTimeout(3000);

    //tutor review the request claims it
    await t.struct.modals.claimLesson.content.claim.waitForVisible();
    await t.struct.modals.claimLesson.content.claim.waitForVisible();

    await t.struct.modals.claimLesson.content.claim.click();
    await t.page.waitForTimeout(1000);

    await t.struct.lessonSpace.sessionPlan.teacherNotes.waitForVisible();
    await t.page.waitForTimeout(10000);

    // tutor voids the lesson
    await t.struct.lessonSpace.header.void.waitForVisible();
    await t.struct.lessonSpace.header.void.click();

    await t.struct.modals.voidLesson.content.void.waitForVisible();
    await t.struct.modals.voidLesson.content.void.click();

    await s.struct.modals.tutorVoided.content.browseTutors.waitForVisible();
    await s.struct.modals.tutorVoided.content.browseTutors.click();

    // click on user menu
    await s.struct.header.userTools.username.click();
    await s.struct.userMenu.signOut.click();

    //tutor signs out
    await t.struct.tutorDashboard.header.userTools.username.click();
    await t.struct.userMenu.signOut.click();
  });
});
