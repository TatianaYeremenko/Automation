import faker, { random } from "faker";

it("student requests a lesson directly but tutor rejects it", async () => {
  //create tutor
  const t = await createQaTutor();

    //create student
  const s = await createQaUser("studentWithUmbrella");

  // get tutor name and id
  const tutorId = t.user.id.toString();

  await t.page.waitForTimeout(5000);
  await t.page.reload();
  await t.page.waitForTimeout(5000);
  await t.page.reload();

  await s.struct.header.browseTutors.waitForVisible();
  await s.struct.header.browseTutors.click();
  await s.page.reload();
  await s.page.waitForTimeout(3000);


  // find available tutor
  console.log(tutorId);

  await s.struct.tutors.tutor(tutorId).name.waitForVisible();
  console.log(await s.struct.tutors.tutor(tutorId).name.text());

  await s.struct.tutors.tutor(tutorId).card.waitForVisible();

  await s.struct.tutors.tutor(tutorId).avatar.waitForVisible();

  await s.struct.tutors.tutor(tutorId).viewProfile.waitForVisible();

  await s.struct.tutors.tutor(tutorId).card.click();


  // chat
  await s.struct.tutorProfile.contact.waitForVisible();
  await s.struct.tutorProfile.contact.click();

  const isHebrew = (text: string) => {
    return text.search(/[\u0590-\u05FF]/) >= 0;
  };

  const isArabic = (text: string) => {
    return text.search(/[\u0600-\u06FF]/) >= 0;
  };

  const rightToLeftText = (text: string) => {
    if (isHebrew(text) || isArabic(text)) {
      return text.split(" ").reverse().join(" ");
    } else {
      return text;
    }
  };
  s.page.keyboard.press("PageDown");

  //student is sending message
  const chatBox = s.page.locator("#chatMessageInput");
  await chatBox.type(
    rightToLeftText("مرحبًا ، أحتاج إلى مساعدة في الرياضيات"),
    { delay: 100 }
  );
  await chatBox.press("Enter");

  // tutor see the message
  await t.struct.tutorDashboard.header.notifications.chat.amount.waitForVisible();
  expect(
    await t.struct.tutorDashboard.header.notifications.chat.amount.text()
  ).toBe("1");

  await t.struct.tutorDashboard.header.notifications.chat.button.waitForVisible();
  await t.struct.tutorDashboard.header.notifications.chat.button.click();
  await t.page.waitForTimeout(2000);

  //   console.log(await t.struct.header.notifications.chat.contact(s.user.id.toString()).text.text());
  //   await t.struct.tutorDashboard.header.notifications.chat.contact(s.user.id.toString()).item.click();
  //   await t.page.waitForTimeout(1000);

  function checkRTL(ss: string) {
    let ltrChars =
        "A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02B8\u0300-\u0590\u0800-\u1FFF" +
        "\u2C00-\uFB1C\uFDFE-\uFE6F\uFEFD-\uFFFF",
      rtlChars = "\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC",
      rtlDirCheck = new RegExp("^[^" + ltrChars + "]*[" + rtlChars + "]");

    return rtlDirCheck.test(ss);
  }
  // console.log();
    checkRTL(
      await t.struct.header.notifications.chat
        .contact(s.user.id.toString())
        .text.text()
    )
  // );

  // student sign out
  await s.struct.header.userTools.username.click();
  await s.struct.userMenu.signOut.click();

  //tutor signs out
  await t.struct.tutorDashboard.header.userTools.username.click();
  await t.struct.userMenu.signOut.click();
});
