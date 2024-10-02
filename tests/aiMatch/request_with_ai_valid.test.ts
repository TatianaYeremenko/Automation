it("Match Pal should not visible for younger grades", async () => {
  const { struct, page } = await createQaUser('studentWithUmbrella');

  await struct.homepage.requestATutor.click();
  await page.waitForTimeout(1000);

  await page.locator("label").filter({ hasText: "5th grade" }).click();
  await page.waitForTimeout(1000);
  await struct.sessionRequest.nextArrow.click();

  await page.locator("label").filter({ hasText: "Math" }).click();
  await page.waitForTimeout(1000);
  await struct.sessionRequest.nextArrow.click();

  await page.locator("label").filter({ hasText: "Basic Math" }).click();
  await page.waitForTimeout(1000);
  await struct.sessionRequest.nextArrow.click();

  await page.getByTestId("sessionRequest.description").click();
  await page
    .getByTestId("sessionRequest.description")
    .fill("If y(x-1)=z then x=");
  await page.waitForTimeout(2000);

  // Match Pal is available
  await struct.sessionRequest.refineSearch.waitForHidden();
  await struct.sessionRequest.matchPalCTA.waitForHidden();
  await page.waitForTimeout(1000);

  // go back
  await struct.sessionRequest.previousArrow.click();
  await page.waitForTimeout(100);

  await struct.sessionRequest.previousArrow.click();
  await page.waitForTimeout(100);

  await struct.sessionRequest.previousArrow.click();
  await page.waitForTimeout(100);
  await page.locator("label").filter({ hasText: "5th grade" }).isVisible();

  // close the form
  await struct.sessionRequest.close.click();
  await page.close();

});
it("Match Pal is available for 6th grade and higher only ", async () => {
  const { struct, page } = await createQaUser('studentWithUmbrella');

  await struct.homepage.requestATutor.click();
  await page.waitForTimeout(1000);

  await page.locator("label").filter({ hasText: "5th grade" }).click();
  await page.waitForTimeout(1000);
  await struct.sessionRequest.nextArrow.click();

  await page.locator("label").filter({ hasText: "Math" }).click();
  await page.waitForTimeout(1000);
  await struct.sessionRequest.nextArrow.click();

  await page.locator("label").filter({ hasText: "Basic Math" }).click();
  await page.waitForTimeout(1000);
  await struct.sessionRequest.nextArrow.click();

  await page.getByTestId("sessionRequest.description").click();
  await page
    .getByTestId("sessionRequest.description")
    .fill("If y(x-1)=z then x=");
  await page.waitForTimeout(2000);

  // Match Pal is available
  await struct.sessionRequest.refineSearch.waitForHidden();
  await struct.sessionRequest.matchPalCTA.waitForHidden();
  await page.waitForTimeout(1000);

  // go back
  await struct.sessionRequest.previousArrow.click();
  await page.waitForTimeout(100);

  await struct.sessionRequest.previousArrow.click();
  await page.waitForTimeout(100);

  await struct.sessionRequest.previousArrow.click();
  await page.waitForTimeout(100);
  await page.locator("label").filter({ hasText: "5th grade" }).isVisible();

  // close the form
  await struct.sessionRequest.close.click();
  await page.close();

});
it("student should be able to see the questions", async () => {
  const { struct, page } = await createQaUser('studentWithUmbrella');

  await struct.homepage.requestATutor.click();
  await page.waitForTimeout(1000);

  await page.locator("label").filter({ hasText: "11th grade" }).click();
  await page.waitForTimeout(1000);

  await struct.sessionRequest.nextArrow.click();

  await page.locator("label").filter({ hasText: "Math" }).click();
  await page.waitForTimeout(1000);

  await struct.sessionRequest.nextArrow.click();

  await page.locator("label").filter({ hasText: "Geometry" }).click();
  await page.waitForTimeout(1000);
  await struct.sessionRequest.nextArrow.click();

  await page.getByTestId("sessionRequest.description").click();
  await page
    .getByTestId("sessionRequest.description")
    .fill("Explain Riemann Surfaces and what they are used for?");
  await page.waitForTimeout(5000);
  await struct.sessionRequest.refineSearch.waitForVisible();
  await struct.sessionRequest.refineSearch.click();
  await page.waitForTimeout(5000);

  await struct.modals.matchPal.waitForVisible();
  await struct.modals.matchPal.content.close.waitForVisible();

  //try 5 times
  await page.getByTestId("modals.matchPal.content.response").fill("Riemann surface is a connected one-dimensional complex manifold and what they are used for in math");
  await page.getByTestId("modals.matchPal.content.response").press("Enter");
  await page.waitForTimeout(2000);

  await struct.modals.matchPal.content.rejectGoals.waitForVisible();
  await struct.modals.matchPal.content.confirmGoals.click();
  await page.waitForTimeout(2000);

  await struct.modals.matchPal.content.continueRequest.waitForVisible();
  await struct.modals.matchPal.content.continueRequest.click();
  await page.waitForTimeout(2000);

  // session goals should not be dispalyed
  await struct.sessionRequest.sessionGoals.waitForVisible();
  // console.log( struct.sessionRequest.sessionGoals.text()
  // )
  // still visiable
  await struct.sessionRequest.matchPalCTA.waitForVisible();
  await struct.sessionRequest.matchPalCTA.click();
  await struct.modals.matchPal.content.continueRequest.click();
  await struct.sessionRequest.close.click();
});
