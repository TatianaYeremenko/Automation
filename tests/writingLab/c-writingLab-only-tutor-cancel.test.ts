import faker, { random } from "faker";

it("Three different tutors cancel WL", async () => {
  // 3 different tutors cancel WL

  for (let i = 0; i < 3; i++) {
    // create tutor
    const t = await createQaUser("tutor");

    // tutor click on "live lesson
    await t.page.waitForTimeout(1000);
    
    await t.struct.tutorDashboard.header.pastTutoring.waitForVisible();
    await t.struct.tutorDashboard.header.pastTutoring.click();

    await t.struct.tutorDashboard.header.availableTutoring.waitForVisible();
    await t.struct.tutorDashboard.header.availableTutoring.click();

    await t.page.getByRole('link', { name: 'Writing Labs' }).click();
    await (await t.page.waitForSelector('text="Writing Lab"')).click();
   

    // click on Claim
    await t.struct.modals.writingLabClaim.content.claim.waitForVisible();
    await t.struct.modals.writingLabClaim.content.claim.click();

    //review the request
    await t.struct.modals.writingLabClaim.content.notes.waitForVisible();
    await t.struct.modals.writingLabClaim.content.chars.waitForVisible();
    await t.struct.modals.writingLabClaim.content.format.waitForVisible();
    await t.struct.modals.writingLabClaim.content.quotedTime.waitForVisible();
    await t.struct.modals.writingLabClaim.content.earnings.waitForVisible();

    // cancel
    await t.page.waitForTimeout(500);
    await (await t.page.waitForSelector('text="Upload"')).isVisible();
    await (await t.page.waitForSelector('text="Cancel"')).click();
    await t.page.waitForTimeout(500);

    // confirm cancelation
    await t.struct.modals.writingLabCancel.content.neverMind.waitForVisible();
    await t.struct.modals.writingLabCancel.content.yesCancel.waitForVisible();
    await t.struct.modals.writingLabCancel.content.yesCancel.click();
    await t.page.waitForTimeout(500);
  }
});
