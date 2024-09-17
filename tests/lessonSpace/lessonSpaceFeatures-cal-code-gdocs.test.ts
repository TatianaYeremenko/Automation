import faker, { random } from "faker";

describe("live lesson - ", () => {
  it("student/tutor Lesson Tools: Calculator is available and working for both", async () => {

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

    // CHECK CALCULATER
    await s.struct.lessonSpace.calculatorButton.click();

    // Enter 789 + 456 =
    const calculation = [
      "7",
      "8",
      "9",
      "Plus",
      "4",
      "5",
      "6",
      "Enter",
    ] as const;

    for (const item of calculation) {
      await s.page.click("[aria-label='" + item + "']");
    }
    // Click if tutor sees the result
    await t.struct.lessonSpace.calculatorButton.click();
    await t.page
      .locator('[aria-label="Expression 1: 789 plus 456 equals 1245"]')
      .isVisible();

    // Check again
    const tutorEquation = [
      "1",
      "1",
      "0",
      "Plus",
      "1",
      "2",
      "0",
      "Enter",
    ] as const;

    for (const item of tutorEquation) {
      await t.page.click("[aria-label='" + item + "']");
    }

    // Click if user sees the result
    await s.page
      .locator('[aria-label="Expression 2: 110 plus 120 equals 230"]')
      .isVisible();

    await s.page.click("text=clear all");
    await s.page.click('span:has-text("​")');

    // CHECK CODE EDITOR

    //click on Code
    await s.struct.lessonSpace.codeEditorButton.click();

    // student check Code Editor
    await s.struct.lessonSpace.codeEditor.toolbar.addFile.click();

    //check the board
    await s.struct.lessonSpace.codeEditor.toolbar.newFileName.type("1");
    await s.struct.lessonSpace.codeEditor.toolbar.addNewFile.click();

    //error message
    expect(
      await s.struct.lessonSpace.codeEditor.toolbar.newFileNameError.text()
    ).toBe("File name must have an extension");

    // click add
    await s.struct.lessonSpace.codeEditor.toolbar.newFileName.type(".py");
    await s.struct.lessonSpace.codeEditor.toolbar.addNewFile.click();

    // click collapse
    await s.struct.lessonSpace.codeEditor.toolbar.collapse.click();

    // click expand
    await s.struct.lessonSpace.codeEditor.toolbar.expand.click();

    // export
    await s.struct.lessonSpace.codeEditor.toolbar.exportFiles.waitForVisible();

    //click on Code in tutor
    await t.struct.lessonSpace.codeEditorButton.click();

    // click on Code Editor
    await t.struct.lessonSpace.codeEditor.toolbar.addFile.click();

    //check the board
    await t.struct.lessonSpace.codeEditor.toolbar.newFileName.type("2");
    await t.struct.lessonSpace.codeEditor.toolbar.addNewFile.click();

    //error message
    expect(
      await t.struct.lessonSpace.codeEditor.toolbar.newFileNameError.text()
    ).toBe("File name must have an extension");

    // click add
    await t.struct.lessonSpace.codeEditor.toolbar.newFileName.type(".py");
    await t.struct.lessonSpace.codeEditor.toolbar.addNewFile.click();
    // click collapse
    await t.struct.lessonSpace.codeEditor.toolbar.collapse.click();
    // click expand
    await t.struct.lessonSpace.codeEditor.toolbar.expand.click();
    // export
    await t.struct.lessonSpace.codeEditor.toolbar.exportFiles.waitForVisible();

    //CHECK GOOGLE DOC

    // student click on Google Doc
    await s.struct.lessonSpace.google.click();

    // open Google Doc
    const [pageDoc] = await Promise.all([
      s.page.waitForEvent("popup"),
      s.struct.lessonSpace.googleDocs.docs.launch.click(),
    ]);
    // Check url
    expect(pageDoc.url()).toContain("docs.google.com/document");

    // open Google Spread Sheet
    const [pageSheet] = await Promise.all([
      s.page.waitForEvent("popup"),
      s.struct.lessonSpace.googleDocs.sheets.launch.click(),
    ]);
    // Check url
    expect(pageSheet.url()).toContain("docs.google.com/spreadsheets");

    // open Google Presentation
    const [pagePres] = await Promise.all([
      s.page.waitForEvent("popup"),
      s.struct.lessonSpace.googleDocs.slides.launch.click(),
    ]);
    // Check url
    expect(pagePres.url()).toContain("docs.google.com/presentation");

    // console.log(pageDoc.url());
    // console.log(pageSheet.url());
    // console.log(pagePres.url());

    pageDoc.close();
    pageSheet.close();
    pagePres.close();

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
