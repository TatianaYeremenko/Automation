import faker, { random } from "faker";

it("student requests a lesson directly but tutor rejects it", async () => {
  //create tutor
  const t = await createQaTutor();
  await t.page.waitForTimeout(7000);

  const s = await createQaUser("studentWithUmbrella");

  // get tutor name and id
  const tutorId = t.user.id.toString();
  const name = t.user.shortName.toString();
  const tutor_num = tutorId.toString();

  //create student
  await t.page.reload();
  await t.page.waitForTimeout(3000);
  
  await s.struct.header.browseTutors.waitForVisible();
  await s.struct.header.browseTutors.click();
  await s.page.reload();
  await s.page.waitForTimeout(3000);


  // find available tutor
  await s.struct.tutors.tutor(tutor_num).name.waitForVisible();
  await s.struct.tutors.tutor(tutor_num).card.waitForVisible();
  await s.struct.tutors.tutor(tutor_num).avatar.waitForVisible();
  await s.struct.tutors.tutor(tutor_num).viewProfile.waitForVisible();
  await s.struct.tutors.tutor(tutor_num).card.click();

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
