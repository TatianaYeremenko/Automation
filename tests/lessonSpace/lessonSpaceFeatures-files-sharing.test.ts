import faker, { random } from "faker";
import { any } from "zod";

describe("live lesson - ", () => {
  it("student/tutor Lesson Tools: File Sharing is available for both student and tutor and both can share files", async () => {
    const s = await createQaUser("studentWithUmbrella");

    //connect with a tutor
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
    const text = `Automation - Lesson submitted from  ${faker.lorem
      .sentence(10)
      .toString()}`;
    await s.struct.sessionRequest.description.fill(text);
    await s.page.waitForTimeout(200);

    // add files
    const fileExamples = [
      "./lib/files/example_1.gif",
      "./lib/files/example_2.jpeg",
      "./lib/files/example_3.gif",
    ];

    await s.struct.sessionRequest.uploadFile.input.click();
    await s.struct.sessionRequest.uploadFile.input.selectFiles(fileExamples[0]);
    await s.page.waitForTimeout(1000);
    await s.struct.sessionRequest.nextArrow.click();

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
    await t.page.waitForTimeout(2000);

    // claim the lesson
    await t.struct.modals.claimLesson.waitForVisible();
    await t.struct.modals.claimLesson.content.claim.click();

    //tutor confirm that a new student
    await t.struct.modals.firstTime.waitForVisible();
    await t.struct.modals.firstTime.content.gotIt.waitForVisible();
    await t.struct.modals.firstTime.content.gotIt.click();

    await t.page
    .locator(
      '//*[@id="react-app"]/div/div[4]/header/div[2]/div[1]/div[2]/div/button'
    )
    .press("Enter");
    
    await t.page.waitForTimeout(10000);

    // student click on File Sharing
    await s.struct.lessonSpace.fileUpload.click();
    await s.struct.lessonSpace.documents.dropTarget.waitForVisible();
    await s.page.waitForTimeout(500);

    //upload files and submit request
    await s.struct.lessonSpace.documents.uploadInput.selectFiles(
      fileExamples[1]
    );
    await s.page.waitForTimeout(3000);


    // tutor click on File Sharing
    await t.struct.lessonSpace.fileUpload.click();
    await t.page.waitForTimeout(300);


    // tutor click on File Sharing
    expect(
      (await t.struct.lessonSpace.documents.tutorFiles(0).name.text()).slice(
        0,
        9
      )
    ).toBe("example_1");

    console.log(
      (await t.struct.lessonSpace.documents.tutorFiles(1).name.text()).slice(
        0,
        9
      )
    );

    expect(
      (await t.struct.lessonSpace.documents.tutorFiles(1).name.text()).slice(
        0,
        9
      )
    ).toBe("example_2");

    await t.struct.lessonSpace.documents
      .tutorFiles(0)
      .download.waitForVisible();
    await t.page.waitForTimeout(2000);

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
