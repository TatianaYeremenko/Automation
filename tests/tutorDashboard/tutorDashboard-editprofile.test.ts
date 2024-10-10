import faker, {
  random
} from "faker";

  it("tutor can edit the profile", async () => {

  //create tutor
  const {
      struct,
      page,
      user
  } =   await createQaTutor();
  
     // click on Edit Profile
      await struct.tutorDashboard.header.userTools.username.waitForVisible();
      await struct.tutorDashboard.header.userTools.username.click();

      await struct.userMenu.editProfile.waitForVisible();
      await struct.userMenu.editProfile.click();

      await page.waitForTimeout(500);

      //enter head line
      const headLine = ['Experienced 10+ years Tutor','Best K-12 Math Tutor','20+ years in Teaching']
      await struct.account.tutorProfile.headline.waitForVisible();
      await struct.account.tutorProfile.headline.type(headLine[1]);

      //select gender
      await struct.account.tutorProfile.gender.select.click();
      await struct.account.tutorProfile.gender.option(1).option.click();
      // console.log(await struct.account.tutorProfile.about.text());

      //type about
      const  about = faker.lorem.sentence(3);
      // console.log(about);
      await struct.account.tutorProfile.about.waitForVisible();
      await struct.account.tutorProfile.about.clear();
      await struct.account.tutorProfile.about.type(about);
      // console.log(await struct.account.tutorProfile.teaching.text());
      
      //type teaching expireance
      const  techer_exp = faker.lorem.sentence(1);
      // console.log(techer_exp);
      await struct.account.tutorProfile.teaching.waitForVisible();
      await struct.account.tutorProfile.teaching.clear();
      await struct.account.tutorProfile.teaching.type(techer_exp);

      //remove work experience
      await struct.account.tutorProfile.addWork.waitForVisible();
      await struct.account.tutorProfile.addWork.click();
      
      await struct.account.tutorProfile.work(0).title.click();
      await struct.account.tutorProfile.work(0).title.type(faker.commerce.department());

      await struct.account.tutorProfile.work(0).company.click();
      await struct.account.tutorProfile.work(0).company.type(faker.company.companyName());

      await struct.account.tutorProfile.work(0).start.select.click();
      await struct.account.tutorProfile.work(0).start.option(2022).option.click();

      await struct.account.tutorProfile.work(0).end.select.click();
      await struct.account.tutorProfile.work(0).end.option(2023).option.click();

      await struct.account.tutorProfile.work(0).description.click();
      await struct.account.tutorProfile.work(0).description.fill(faker.lorem.sentences(3));
    
      //education 
      await struct.account.tutorProfile.addEducation.waitForVisible();
      await struct.account.tutorProfile.addEducation.click();

      //select college
      await struct.account.tutorProfile.education(0).college.select.waitForVisible();
      await struct.account.tutorProfile.education(0).college.select.type('Los Angeles City College');
      await struct.account.tutorProfile.education(0).college.select.press('ArrowDown');
      await struct.account.tutorProfile.education(0).college.select.press('Enter');

      //select major
      await struct.account.tutorProfile.education(0).major.select.waitForVisible();
      await struct.account.tutorProfile.education(0).major.select.type('Business');
      await struct.account.tutorProfile.education(0).major.select.press('ArrowDown');
      await struct.account.tutorProfile.education(0).major.select.press('Enter');

      //select degree
      await struct.account.tutorProfile.education(0).degree.select.waitForVisible();
      await struct.account.tutorProfile.education(0).degree.select.type("Bachelor's Degree");
      await struct.account.tutorProfile.education(0).degree.select.press('ArrowDown');
      await struct.account.tutorProfile.education(0).degree.select.press('Enter');

      //select start date
      await struct.account.tutorProfile.education(0).start.select.type('2010');
      await struct.account.tutorProfile.education(0).start.select.press('ArrowDown');;
      await struct.account.tutorProfile.education(0).start.select.press('Enter');

      //select end date
      await struct.account.tutorProfile.education(0).end.select.type('2014');
      await struct.account.tutorProfile.education(0).end.select.press('ArrowDown');;
      await struct.account.tutorProfile.education(0).end.select.press('Enter');

      await (await page.waitForSelector('//button[contains(text(),"Submit")]')).click();
      await page.waitForTimeout(2000);
      await struct.toast.success.waitForVisible();


      // click on Edit Profile
      await struct.tutorDashboard.header.userTools.username.click();
      await struct.userMenu.editProfile.click();
      await page.waitForTimeout(2000);
      await page.reload();

      console.log((await struct.account.tutorProfile.about.text()).toString());
      console.log((await struct.account.tutorProfile.teaching.text()).toString());

      // checked edited data
      expect(await struct.account.tutorProfile.about.text()).toBe(about.toString());
      expect(await struct.account.tutorProfile.teaching.text()).toBe(techer_exp.toString());

      //tutor signs out
      await struct.tutorDashboard.header.userTools.username.click();
      await struct.userMenu.signOut.click();

  });
