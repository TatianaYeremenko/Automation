import faker, {
  random
} from "faker";

  it("student contacts a tutor directly, then cancel the request", async () => {

      //create tutor
      const t = await createQaTutor();

      // get tutor name and id
      let tutorId  = t.user.id;
      // let name = t.user.shortName.toString();

      //create student
      const s = await createDirectRequest('studentWithUmbrella');
      // const s = await createQaUser('studentWithUmbrella');

      // // go to browse tutors 
      // await s.struct.header.browseTutors.waitForVisible();
      // await s.struct.header.browseTutors.click();
      // await s.page.waitForTimeout(500);
      // // find available tutor
      // await s.struct.tutors.filter.onlineNow.waitForVisible();
      // await s.struct.tutors.filter.onlineNow.check();
      // await s.page.waitForTimeout(500);

      // // click on the tutor      
      // await s.struct.tutors.tutor(tutorId).card.click();
      // await s.page.waitForTimeout(500);

      // //click on Start Lesson
      // await s.struct.tutorProfile.requestLesson.waitForVisible();
      // await s.struct.tutorProfile.requestLesson.click();

      // // select a subject form modal
      // await s.struct.modals.connectTutor.waitForVisible();
      // await s.struct.modals.connectTutor.content.subjectSelect.click();
      // await s.struct.modals.connectTutor.content.subjectSelect.press('ArrowDown');
      // await s.struct.modals.connectTutor.content.subjectSelect.press('Enter');

      // //select grade
      // await (await s.page.waitForSelector('id="react-aria3946528176-7"')).click();
      // await s.struct.modals.connectTutor.content.subjectSelect.press('ArrowDown');
      // await s.struct.modals.connectTutor.content.subjectSelect.press('Enter');

      // await s.struct.sessionRequest.codeOfConduct.click();

      //modal pops up 
      await s.struct.modals.waitingForTutor.waitForVisible();
      await s.page.waitForTimeout(1000);

      // tutor see the rquest
      await t.struct.modals.overlay.waitForVisible();
      await t.struct.modals.request.content.reject.waitForVisible();
      await t.struct.modals.request.content.reject.click();

      //student see the modal that tutot rejected the request
      console.log(await s.struct.modals.requestRejected.content.tutor(tutorId).text());
      console.log(await s.struct.modals.requestRejected.content.messageTutor.text());
      await s.struct.modals.requestRejected.content.close.waitForVisible();

      // student closes it
      await s.struct.modals.requestRejected.content.okay.click();

      await s.page.waitForTimeout(1000);
      await t.page.waitForTimeout(1000);

      // student signs out
      await s.struct.header.userTools.username.click();
      await s.struct.userMenu.signOut.click();

      //tutor signs out
      await t.struct.tutorDashboard.header.userTools.username.click();
      await t.struct.userMenu.signOut.click();
  });
