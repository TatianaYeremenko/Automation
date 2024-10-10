
    it("an user who wants to become a tutor should be redirect to GreenHouse page", async () => {
      const { struct, page } = await createVisitor();
  
      // clcik on "Want to become a tutor?""
      await struct.authPages.signIn.applyToTutor.waitForVisible();
      await struct.authPages.signIn.applyToTutor.click();
      await page.waitForTimeout(1000);

      expect(await page.title()).toContain('Job Application for Contract Tutor at Pear Deck Tutor');

      expect(page.url()).toContain('greenhouse.io/tutorme/jobs');
      await page.goBack();
      await page.close();

    });
  