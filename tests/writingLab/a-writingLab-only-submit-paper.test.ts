import faker, { date, random } from "faker";
import { env } from "process";
import * as fs from "fs";
import { Alignment, Document, Packer, Paragraph, TextRun } from "docx";

describe("WL test", function () {
  function createDoc(wordsNums: number, docUrl: string) {
    //This function creates a .dosc file with different numbers words and saves it in the files folder
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun("Creating Document"),
                new TextRun({
                  text: faker.lorem.words(wordsNums),
                  bold: true,
                }),
                new TextRun({
                  text: "\tDone",
                  bold: true,
                }),
              ],
            }),
          ],
        },
      ],
    });
    // Used to export the file into a .docx file
    Packer.toBuffer(doc).then((buffer) => {
      fs.writeFileSync(docUrl, buffer);
    });
  }

  // prepare valid and invalid paper
  let valid = createDoc(500, "./lib/files/myDoc.docx");
  let invalid = createDoc(10, "./lib/files/invalidDoc.docx");

  // discription of wl
  let wlDiscription =  "Description: " + faker.lorem.words(40).toString();
  let title = `Title: submitted automation ${faker.lorem.words(1).toString()}`;


  it("WL Only Umbrella student submits WL and check the past records", async () => {
    const admin = await createAdmin();

    await admin.page.getByRole('link', { name: 'Umbrella accounts' }).click();
    // await page.getByLabel('').click();
    await admin.page.getByLabel('').fill('Writing Lab Only TEST');
    await admin.page.getByRole('button', { name: 'Search' }).click();
    await admin.page.getByRole('link', { name: 'Writing Lab Only TEST' }).click();
    await admin.page.getByLabel('Writing lab only').uncheck();
    await admin.page.getByRole('button', { name: 'Save and continue editing' }).click();
    await admin.page.getByText('This is a delegated property and must be set on the parent Umbrella to take effe').click();
    await admin.page.getByText('Writing lab only').check();
    await admin.page.getByRole('button', { name: 'Save and continue editing' }).click();
    await admin.page.getByRole('link', { name: 'Log out' }).click();

    const { page, struct } = await createVisitor();
    // sign in
    await struct.authPages.signIn.email.waitForVisible();
    await struct.authPages.signIn.email.fill("qa-user-umbrella-003@local.tutorme.com");

    await struct.authPages.signIn.password.waitForVisible();
    await struct.authPages.signIn.password.type("Ff22558800!");

    await page.waitForTimeout(2000);
    await fillRecaptcha(struct.authPages.signIn.recaptcha);
    await page.waitForTimeout(1000);

    await struct.authPages.signIn.signIn.waitForVisible();
    await struct.authPages.signIn.signIn.click();

    await page.waitForTimeout(2000);
    await page.reload();
    
    //only wl should be available

    const element_test = page.locator('#modals.writingLabExpired.content.resubmit');
    if (await element_test.count() > 0) {
      // Element exists, do something with it
      await struct.modals.writingLabExpired.content.resubmit.click();
      await struct.modals.writingLab.content.close.click();

    } 

    await struct.homepage.writingLab.waitForVisible();
    await struct.homepage.requestATutor.waitForHidden();
    await struct.homepage.writingLab.click();
    

    // check the validation message for required fields

    // empty title
    await struct.modals.writingLab.content.title.waitForVisible();
    await struct.modals.writingLab.content.title.type("");

    // empty description
    await struct.modals.writingLab.content.description.waitForVisible();
    await struct.modals.writingLab.content.description.type("");

    // Next should not be visiable
    await page.getByTestId("modals.writingLab.content.next").isHidden();

    //Close page button is visiable
    await struct.modals.writingLab.content.close.waitForVisible();

    // check title input validation
    await struct.modals.writingLab.content.title.fill(
      faker.lorem.words(20).toString()
    );

    // type WL description
    await struct.modals.writingLab.content.description.fill(
      faker.lorem.words(160).toString()
    );

    // message appears
    expect(await struct.modals.writingLab.content.titleError.text()).toBe(
      "The maximum characters for this field is 100 characters."
    );
    expect(await struct.modals.writingLab.content.descriptionError.text()).toBe(
      "The maximum characters for this field is 1,000 characters."
    );

    // enter valid data
    await struct.modals.writingLab.content.title.clear();
    await struct.modals.writingLab.content.title.fill(title);
    await struct.modals.writingLab.content.description.clear();
    await struct.modals.writingLab.content.description.fill(wlDiscription);

    // click on Next
    await struct.modals.writingLab.content.next.waitForVisible();
    await struct.modals.writingLab.content.next.click();

    await page.waitForTimeout(1000);

    // check Paper Style
    await page.getByText("APA (American Psychological Association)").click();

    // click on Next
    await struct.modals.writingLab.content.next.click();
    await page.waitForTimeout(1000);

    // upload invalid file
    await page.locator('//span[contains(text(),"Upload a Microsoft Word (.docx) file")]').check();
    // await page.setInputFiles('//input[@aria-label="Upload a Microsoft Word (.docx) file"]', "lib/files/invalidDoc.docx" );

    await struct.modals.writingLab.content.fileInput.selectFiles(
      "lib/files/invalidDoc.docx"
    );
    await page.waitForTimeout(1000);

    // error should be dispalyed
    expect(await struct.modals.writingLab.content.fileError.text()).toBe('Document must be more than 500 characters.');
    await struct.modals.writingLab.content.file("fileUpload-1").remove.click();

    // upload file
    await struct.modals.writingLab.content.fileInput.selectFiles(
      "lib/files/myDoc.docx"
    );
    await page.waitForTimeout(2000);

  //check estimation
  await struct.modals.writingLab.content.characters.waitForVisible();
  await struct.modals.writingLab.content.estimatedTime.waitForVisible();
  await struct.modals.writingLab.content.timeEstimate.waitForVisible();

  // click on Submit
  await struct.modals.writingLab.content.submit.waitForVisible();
  await struct.modals.writingLab.content.submit.click();
  await page.waitForTimeout(1000);

  //click on the link Code of Conduct
  const [pageHonorCode] = await Promise.all([
    page.waitForEvent("popup"),
    struct.modals.writingLab.content.honorCode.click(),
  ]);
  expect(pageHonorCode.url()).toContain(
    "https://www.peardeck.com/policies/pear-deck-tutor-code-of-conduct"
  );
  await pageHonorCode.close();

  // click on Submit
  await struct.modals.writingLab.content.submit.waitForVisible();
  await struct.modals.writingLab.content.submit.click();
  await page.waitForTimeout(1000);

  // click on Return Home
  await struct.modals.writingLab.content.returnToHomepage.waitForVisible();
  await struct.modals.writingLab.content.returnToHomepage.click();
  await page.waitForTimeout(1000);

  //click on User Usage again
  // await struct.header.userTools.openMenu.click();
  // await struct.userMenu.myAccount.waitForVisible();
  // await struct.userMenu.myAccount.click();
  await page.goto('https://stg-tutor.peardeck.com/account/');
  await page.waitForLoadState('load');
  await struct.account.usage.click();

  // check the Limit again
  await struct.account.usageDetails.remaining.waitForVisible();

  //click on User Past Lesson
  await page.goto('https://stg-tutor.peardeck.com/history/');
  await page.waitForLoadState('load');
  // await struct.header.userTools.openMenu.click();
  // await struct.userMenu.pastLessons.waitForVisible();
  // await struct.userMenu.pastLessons.click();

  await page.waitForTimeout(1000);

  // Wl is visible in Past WL
  await page.locator('//div[contains(text(),"'+title+'")]').isVisible();

  await struct.header.userTools.username.click();
  await struct.userMenu.signOut.click();
});  
});
