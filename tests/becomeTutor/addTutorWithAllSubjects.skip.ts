import faker, { random } from "faker";
import { product } from "../../lib/shared";

describe("Create Tutor Accounts with all subjects: ", () => {

  // names
  const f_userFirstName = faker.name.firstName(1);
  const f_userLastName = faker.name.lastName();
  const f_userShortName = `${f_userFirstName} ${f_userLastName.slice(0, 1)}.`;

  // create email and password
  const f_email =
    `${f_userFirstName}${f_userLastName}tutor@local.tutorme.com`.toLowerCase();

  // console.log(email);
  const password = "Tutor12345!";
  // console.log(password);

  //upload picture
  const femalesExamples = [
    "./lib/tutors/females/1.jpg",
    "./lib/tutors/females/2.png",
    "./lib/tutors/females/3.png",
    "./lib/tutors/females/4.png",
    "./lib/tutors/females/5.png",
    "./lib/tutors/females/6.png",
    "./lib/tutors/females/7.png",
    "./lib/tutors/females/8.png",
  ] as const;

  //enter head line
  const headLine = [
    "Experienced 10+ years Tutor",
    "Best K-12 Math Tutor",
    "20+ years in Teaching",
  ];

  it("Tutor is added through Admin Panel - user name is $email and password is $password",
    async () => {
      const a = await createAdmin();

      await a.page.waitForTimeout(1000);
      await a.page.keyboard.down("PageDown");

      await (
        await a.page.waitForSelector('//a[contains(text(),"Tutor profiles")]')
      ).click();
      await a.page.waitForTimeout(500);

      await (
        await a.page.waitForSelector(
          '//a[contains(text(),"Add tutor profile")]'
        )
      ).click();
      await a.page.waitForTimeout(500);

      await a.page.getByLabel("Email:").click();
      await a.page.getByLabel("Email:").fill(f_email);
      await a.page.getByLabel("First name:").click();
      await a.page.getByLabel("First name:").fill(f_userFirstName);
      await a.page.getByLabel("Last name:").click();
      await a.page.getByLabel("Last name:").fill(f_userLastName);

      // add subjects
      const subjects = [
        "Early Math",
        "Higher Math",
        "Advanced Math",
        "Statistics"
      //   "Spanish",
      //   "English Language Arts",
      //   "Writing",
      //   "Biology",
      //   "Chemistry",
      //   "Earth Science",
      //   "Physics",
      //   "General Computer Science",
      //   "Python Programming",
      //   "Java Programming",
      //   "C Programming",
      //   "C++ Programming",
      //   "Social Studies",
      //   "Economics",
      //   "Psychology",
      //   "French",
      //   "Education",
      //   "Music",
      //   "Microsoft Office",
      //   "Business",
      //   "Sociology",
      //   "Philosophy",
      //   "Nursing",
      //   "Public Health",
      //   "Library and Information Science",
      ] as const;

      for (const item of subjects) {
        await a.page.getByLabel(item).check();
      }

      // education
      await (
        await a.page.waitForSelector(
          '//span[@aria-labelledby="select2-id_college-container"]'
        )
      ).click();
      await a.page.getByRole("searchbox").fill("Los Angeles City College");
      await a.page
        .getByRole("option", { name: "Los Angeles City College" })
        .click();
      await a.page.getByLabel("College start year:").click();
      await a.page.getByLabel("College start year:").fill("2021");
      await a.page.getByLabel("College end year:").click();
      await a.page.getByLabel("College end year:").fill("2023");
      await a.page.getByLabel("College end year:").click();
      await (
        await a.page.waitForSelector('//select[@id="id_college_degree"]')
      ).selectOption("1");
      await (
        await a.page.waitForSelector(
          '//span[@aria-labelledby="select2-id_college_major-container"]'
        )
      ).click();
      await a.page.waitForTimeout(500);

      await (
        await a.page.waitForSelector('//input[@type="search"]')
      ).fill("Business");
      await a.page.keyboard.press("Enter");

      // select BackgroundCheck
      await a.page
        .getByRole("listitem")
        .filter({ hasText: "BackgroundCheckTrait" })
        .getByRole("checkbox")
        .check();

      // select WritingLabTrait
      await a.page
        .getByRole("listitem")
        .filter({ hasText: "WritingLabTrait" })
        .getByRole("checkbox")
        .check();

      // save
      await a.page.locator('input[name="_continue"]').click();

      // enter User Acount and add password
      await a.page.keyboard.down("PageDown");

      await (
        await a.page.waitForSelector('//a[contains(text(),"User Profile")]')
      ).click();
      await a.page.waitForTimeout(500);

      await (
        await a.page.waitForSelector('//a[contains(text(),"this form")]')
      ).click();
      await a.page.waitForTimeout(500);

      await a.page.locator('//input[@id="id_password1"]').fill(password);
      await a.page.locator('//input[@id="id_password2"]').fill(password);

      await a.page.locator('//input[@value="Change password"]').click();

      await (
        await a.page.waitForSelector('//a[contains(text(),"Login as")]')
      ).click();
      await a.page.waitForTimeout(2000);

      await a.page.getByTestId("header.userTools.openMenu").click();
      await a.page.getByTestId("userMenu.myAccount").click();

      await a.page.waitForTimeout(1000);
      await (
        await a.page.waitForSelector('//div[contains(text(),"Change photo")]')
      ).click();
      await a.page.waitForTimeout(1000);

      await a.page
        .locator('//input[@id="avatarChangeFileInput"]')
        .setInputFiles(femalesExamples[faker.datatype.number(4)]);
      await a.page.waitForTimeout(1000);

      await (
        await a.page.waitForSelector(
          '//button[@data-testid="modals.changeAvatar.content.crop"]'
        )
      ).click();
      await a.page.waitForTimeout(1000);

      await a.page.keyboard.press("PageDown");
      await a.page.waitForTimeout(1000);

      await (
        await a.page.waitForSelector(
          '//div[@data-testid="account.profile.life.select"]'
        )
      ).click();
      await a.page
        .getByTestId("account.profile.life.option(career).option")
        .click();

      await a.page.getByTestId("account.profile.phone").click();
      await a.page.getByTestId("account.profile.phone").fill("124233254436436");
      await a.page.waitForTimeout(1000);

      await (
        await a.page.waitForSelector(
          '//button[contains(text(),"Save changes")]'
        )
      ).click();
      await a.page.waitForTimeout(1000);

      await a.page.getByTestId("header.userTools.openMenu").click();
      await a.page
        .getByRole("menuitem", { name: "Switch to tutor mode" })
        .click();

      // check other subjects
      await a.page.getByRole("link", { name: "Subjects and Skills" }).click();

      // add subjects
      const list_subjects = [
        // 10002, 10007, 10012, 10012, 
        10016, 10072, 10070, 10035, 10056, 10053,
        10048, 10045, 10037, 10042, 10039, 10041, 10040, 10018, 10028, 10034,
        10060, 10068, 10061, 10067, 10062, 10063, 10064, 10065, 10066, 10069,
      ] as const;

      for (const item of list_subjects) {
        await a.page
          .getByTestId("account.subjects.subject(${item})")
          .locator("path")
          .click();
        console.log(
          await a.page
            .getByTestId("account.subjects.subject(${item})")
            .textContent()
        );
      }

      await a.page.getByRole("button", { name: "Save selections" }).click();
      await a.page.waitForTimeout(100);
      await (
        await a.page.waitForSelector(
          '//a[contains(text(),"Go to your account")]'
        )
      ).click();

      await a.page
        .getByTestId("tutorDashboard.header.userTools.openMenu")
        .click();
      await a.page.getByTestId("userMenu.editProfile").click();
      await a.page.waitForTimeout(1000);

      await a.page.getByTestId("account.tutorProfile.headline").click();
      await a.page
        .getByTestId("account.tutorProfile.headline")
        .fill(headLine[faker.datatype.number(2)]);
      await a.page.waitForTimeout(1000);

      await a.page.getByTestId("account.tutorProfile.gender.select").click();
      await a.page
        .getByTestId("account.tutorProfile.gender.option(4).option")
        .click();
      await a.page.waitForTimeout(1000);

      // add teaching experiance
      await a.page.getByTestId("account.tutorProfile.teaching").click();
      await a.page
        .getByTestId("account.tutorProfile.teaching")
        .fill(faker.lorem.sentence(10));
      await a.page.waitForTimeout(1000);

      await a.page.getByRole("button", { name: "Submit" }).click();
      await a.page.waitForTimeout(1000);

      await a.page
        .getByTestId("tutorDashboard.header.userTools.openMenu")
        .click();
      await a.page.getByTestId("userMenu.signOut").click();
    }
  );
});
