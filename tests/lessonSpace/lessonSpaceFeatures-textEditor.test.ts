import faker, { random } from "faker";

describe("live lesson - ", () => {
  it("student/tutor Lesson Tools: Text Editor is available and working for both", async () => {

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

    // Click on Text Editor
    await s.struct.lessonSpace.textEditorButton.click();

    // Click on Text
    for (const i of [12, 24]) {
      await s.struct.lessonSpace.textEditor.fontSize.selectBase.click();
      await s.struct.lessonSpace.textEditor.fontSize.item(i).click();
    }
    //Select color
    await s.struct.lessonSpace.textEditor.fontColor.selectBase.click();

    // Click on each
    const textEditButtons = [
      "bold",
      "italic",
      "underline",
      "strike",
      "highlight",
      "orderedList",
      "unorderedList",
      "todoList",
      "leftAlign",
      "centerAlign",
      "rightAlign",
      "indent",
      "unindent",
      "undo",
      "redo",
    ] as const;
    for (const item of textEditButtons) {
      await s.struct.lessonSpace.textEditor[item].click();
    }
    await s.struct.lessonSpace.textEditor.todoList.click();
    await s.struct.lessonSpace.textEditor.todoList.click();

    //check accessibility module
    await s.struct.lessonSpace.textEditor.accessibility.click();
    await s.struct.modals.textEditorAccessibility.waitForVisible();
    await s.struct.modals.textEditorAccessibility.content.close.click();

    //check LATEX
    await s.struct.lessonSpace.textEditor.latex.button.click();
    await s.struct.lessonSpace.textEditor.latex.textArea.type("2^2");
    await s.struct.lessonSpace.textEditor.latex.apply.click();
    expect(await s.struct.lessonSpace.textEditor.textArea.text()).toContain(
      "22Powered"
    );

    //click again and click on Help
    await s.struct.lessonSpace.textEditor.latex.button.click();
    const [pageHelp] = await Promise.all([
      s.page.waitForEvent("popup"),
      s.struct.lessonSpace.textEditor.latex.help.click(),
    ]);

    // Check url
    expect(pageHelp.url()).toBe(
      "https://help.tutor.peardeck.com/en/articles/984358-how-do-i-write-math-expressions-latex"
    );

    //close page
    await pageHelp.close();

    //tutor sees the same

    // Click on Text Editor
    await t.struct.lessonSpace.textEditorButton.click();

    for (const item of textEditButtons) {
      await t.struct.lessonSpace.textEditor[item].click();
    }
    await t.struct.lessonSpace.textEditor.todoList.click();

    expect(await t.struct.lessonSpace.textEditor.textArea.text()).toContain(
      "22Powered"
    );

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
