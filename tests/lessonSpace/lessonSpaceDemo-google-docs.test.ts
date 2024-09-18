describe('Visitor/Regular/Umbrella Demo Lesson Space - ', () => {
    it.each < {
        type: QaUserKind
    } > ([{
            type: "student"
        }, {
            type: "studentWithUmbrella"
        }
    ])(
        '$type - google docs are available but disabled in DEMO',
        async ({
            type
        }) => {
            const u = await createQaUser(type);

        //Click on Demo Space
        await u.struct.header.userTools.username.click();
        await u.struct.userMenu.demoLessonSpace.click();

        // Click on Google Docs
        await u.struct.demoLessonSpace.google.click();
        
        // button are disabled
        expect(await u.page.getByRole('main').locator('button').filter({ hasText: 'Launch Google Docs' }).isEnabled()).toBeFalsy();
        expect(await u.page.getByRole('main').locator('button').filter({ hasText: 'Launch Google Sheets' }).isEnabled()).toBeFalsy();
        expect(await u.page.getByRole('main').locator('button').filter({ hasText: 'Launch Google Slides' }).isEnabled()).toBeFalsy();

        // check full-screen feature
        await u.struct.demoLessonSpace.fullScreen.click();
        await u.page.locator('//button[@aria-label="Exit Full Screen"]').isVisible();

        // click again
        await u.struct.demoLessonSpace.fullScreen.click();
        await u.page.locator('//button[@aria-label="Full Screen (Lesson Space)"]').isVisible();


        // open Google Doc should not be available with the latest changes - https://goguardian.atlassian.net/issues/PDTT-342
        // const [pageDoc] = await Promise.all([
        //     u.page.waitForEvent('popup'),
        //     u.page.getByRole('button', { name: 'Launch Google Docs Opens an external source' }).click(),
        //     u.page.waitForTimeout(1000)
        // ]); 
                                 
        // // Check url
        // expect(pageDoc.url()).toContain('docs.google.com/document');

        // // open Google Spread Sheet
        // const [pageSheet] = await Promise.all([
        //     u.page.waitForEvent('popup'),
        //     u.page.getByRole('button', { name: 'Launch Google Sheets Opens an external source' }).click(),
        //     u.page.waitForTimeout(1000)

        // ]);               
        // // Check url
        // expect(pageSheet.url()).toContain('docs.google.com/spreadsheets');
 
        // // open Google Presentation
        // const [pagePres] = await Promise.all([
        //     u.page.waitForEvent('popup'),
        //     u.page.getByRole('button', { name: 'Launch Google Slides Opens an external source' }).click(),
        //     u.page.waitForTimeout(1000)

        // ]);               
        // // Check url
        // expect(pagePres.url()).toContain('docs.google.com/presentation');
        
        // close all pages
        // pageDoc.close();
        // pageSheet.close();
        // pagePres.close();

        await u.struct.demoLessonSpace.header.exit.click();

        //Signs out
        await u.struct.header.userTools.username.click();
        await u.struct.userMenu.signOut.click();       

    });
});

