describe('Visitor/Regular/Umbrella Demo Lesson Space - ', () => {
    it.each < {
        type: QaUserKind
    } > ([{
            type: "student"
        }, {
            type: "studentWithUmbrella"
        }
    ])(
        '$type - calculator is available and working',
        async ({
            type
        }) => {
            const u = await createQaUser(type);

             //Click on Demo Space
             await u.struct.header.userTools.username.click();
             await u.struct.userMenu.demoLessonSpace.click();

            // check the title
            expect(await u.struct.demoLessonSpace.header.title.text()).toBe('Demo Lesson Space: Whiteboard');

            //Notes that its demo
            await u.page.locator('//div[contains(text(),"All communication, including audio/video, is monitored. Do not share any personal information.")]').isVisible();
            await u.page.locator('//div[contains(text(),"This is just a demo chat. No one will respond.")]').isVisible();

            // click on Timer
            await u.page.locator('//button[@aria-label="Session Timer"]').click();
            await u.page.locator('//div[@aria-current="time"]').isVisible();
            let start_time = await u.page.locator('//div[@aria-current="time"]').innerText();

            //check the timer
            function timeValidation(strTime: string) {
                var timeFormat = /^\d?\d:\d{2}:\d{2}$/;
                return timeFormat.test(strTime);
            }
            timeValidation( start_time);
            await u.page.waitForTimeout(3000);

            let later_time =(await u.page.locator('//div[@aria-current="time"]').innerText());
            timeValidation( later_time);
            expect( later_time).not.toBe(start_time);
            console.log('start timer',start_time,' and a few secs later:',later_time);

            //click on Support lesson and then close it
            await u.struct.demoLessonSpace.header.support.waitForVisible();

            //Close it 
            await u.struct.demoLessonSpace.header.exit.waitForVisible();
            await u.struct.demoLessonSpace.header.exit.click();

            //Signs out
            await u.struct.header.userTools.username.click();
            await u.struct.userMenu.signOut.click();

        });
});