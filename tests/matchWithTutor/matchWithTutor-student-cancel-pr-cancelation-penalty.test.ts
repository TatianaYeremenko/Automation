import faker, { random } from "faker";
import { number } from "zod";

it(`During the waiting period, a student can cancel the lesson`, async () => {
  //create student
  // const t = await createTutorInQueue();
  const s = await createPublicRequest('studentWithUmbrella');

  await s.page.waitForTimeout(1000);
  await s.page.setViewportSize({ width: 1600, height: 1200 });

  // student cancels the public request
  // user can minimize it
  await s.struct.modals.notifyingTutors.content.minimize.waitForVisible();

  //Are you ready for your session? 
  //NOTE: check-box list needs to added here

  //user can pause it
  await s.struct.modals.notifyingTutors.content.pause.waitForVisible();
  await s.struct.modals.notifyingTutors.content.pause.click();

  //user can uppause it
  await s.struct.modals.notifyingTutors.content.pause.waitForVisible();
  await s.struct.modals.notifyingTutors.content.pause.click();


  await s.struct.modals.notifyingTutors.content.cancel.waitForVisible();
  await s.struct.modals.notifyingTutors.content.cancel.click();

  // student confirms the concelation
  const confirm_cancelation_popup = await s.struct.modals.confirmCancel.waitForVisible();
  if (!confirm_cancelation_popup) {
    throw new Error(`Confirmation Cancel pop-up is not visiable`);
  }
  
  // discription is there
  // expect(await s.page.locator('//div[@class="paragraph"]').allTextContents()).toBe("We're looking for the right-match tutor, so you can start your session soon. If you need to cancel, you can submit a new request any time.");

  // user can select "keep searching"
  await s.struct.modals.confirmCancel.content.keepSearching.waitForVisible();
  await s.struct.modals.confirmCancel.content.keepSearching.click();

  // cancel again
  await s.struct.modals.notifyingTutors.content.cancel.waitForVisible();
  await s.struct.modals.notifyingTutors.content.cancel.click();

  // user can cancel it
  await s.struct.modals.confirmCancel.content.cancel.waitForVisible();
  await s.struct.modals.confirmCancel.content.cancel.click();

  // a user shoul redirect to home page
  if (!await s.struct.homepage.requestATutor.waitForVisible()) {
    throw new Error(`Student was not able to cancel the request and redirect to the home page`);
  }

  //user have to wait 30 seconds to request it again
  await s.struct.homepage.requestATutor.click();

  // the Request Penalty should show up
  await s.struct.modals.requestPenalty.waitForVisible();

  //check all objects are visiable
  expect(await (await s.page.waitForSelector('//div[@id="modalDesc"]')).textContent()).toContain('You have just cancelled your request');
  await s.struct.modals.requestPenalty.content.close.waitForVisible();
  await s.struct.modals.requestPenalty.content.okGotIt.waitForVisible();
  let timer_first_try: unknown = ((await s.struct.modals.requestPenalty.content.timer.text()).slice(-2));
  await s.struct.modals.requestPenalty.content.okGotIt.click();

  // click on it again after a few seconds
  await s.page.waitForTimeout(10000);
  await s.struct.homepage.requestATutor.click();
  await s.struct.modals.requestPenalty.waitForVisible();
  let timer_second_try: string = ((await s.struct.modals.requestPenalty.content.timer.text()).slice(-2));

  // check the timer
  var first = Number(timer_first_try)
  var second = Number(timer_second_try)
  expect(first).toBeGreaterThan(second);
  // console.log(first,second);

  // close the pop-up
  await s.struct.modals.requestPenalty.content.close.click();
  await s.page.waitForTimeout(20000);

  // check it again after 30 secs
  await s.struct.homepage.requestATutor.click();
  (await s.page.waitForSelector('//h1[contains(text(),"What is your grade level?")]')).isVisible(); 

  // go back
  await s.page.goBack();

  // click on user menu
  await s.struct.header.userTools.username.click();
  await s.struct.userMenu.signOut.click();
});
