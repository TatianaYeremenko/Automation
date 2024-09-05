import faker, { random } from "faker";

describe("live lesson - ", () => {
  it("Math Game in PlayGround is available and working", async () => {  
    //create student
    const s = await createQaUser("studentWithUmbrella");
    
    // submit the request
    await s.struct.homepage.requestATutor.waitForVisible();
    await s.struct.homepage.requestATutor.click();

    await s.page.locator('label').filter({ hasText: '5th grade' }).click();
    await s.struct.sessionRequest.nextArrow.click();
  
    await s.page.locator('label').filter({ hasText: 'Math' }).click();
    await s.struct.sessionRequest.nextArrow.click();
  
    await s.page.locator('label').filter({ hasText: 'Basic Math' }).click();
    await s.struct.sessionRequest.nextArrow.click();
  
    await s.page.getByTestId('sessionRequest.description').click();
    await s.page.getByTestId('sessionRequest.description').fill('checking Math game here');
    await s.page.waitForTimeout(2000);

    await s.struct.sessionRequest.nextArrow.click();
    await s.page.waitForTimeout(1000);

    await s.page.locator('label').filter({ hasText: 'I am so lost' }).click();

    await s.page.locator('label').filter({ hasText: 'Audio only' }).click();
    await s.struct.sessionRequest.nextArrow.click();

    // move to the confirmation page
    await s.struct.sessionRequest.codeOfConduct.click();
    await s.struct.sessionRequest.requestTutor.click();
    await s.page.waitForTimeout(1000);

    // PLAY GAME MENUE IS AVALABLE

    //header is dispalyed
    await s.page.getByText('Play a game while you wait!').isVisible();
    await s.page.getByText('Or use the whiteboard to prepare your questions for the tutor').isVisible();

    // games are listed
    expect(await s.struct.lessonSpace.gamePanel.draw.text()).toBe("Draw");
    expect(await s.struct.lessonSpace.gamePanel.wordSearch.text()).toBe("Word search");
    expect(await s.struct.lessonSpace.gamePanel.math.text()).toBe("Speed math");

    // minimalize is working and games are hidden
    await s.struct.lessonSpace.gamePanel.minimize.waitForVisible();
    await s.struct.lessonSpace.gamePanel.minimize.click();

    // games is hidden
    await s.struct.lessonSpace.gamePanel.draw.waitForHidden();
    await s.struct.lessonSpace.gamePanel.wordSearch.waitForHidden();
    await s.struct.lessonSpace.gamePanel.math.waitForHidden();

    // click on minimalize to open the menu
    await s.struct.lessonSpace.gamePanel.minimize.waitForVisible();
    await s.struct.lessonSpace.gamePanel.minimize.click();

     // games are avalable
    await s.struct.lessonSpace.gamePanel.draw.waitForVisible();
    await s.struct.lessonSpace.gamePanel.wordSearch.waitForVisible();
    await s.struct.lessonSpace.gamePanel.math.waitForVisible();

    // Speed math game (CAN BE IMPROVED)
    await s.struct.lessonSpace.gamePanel.math.waitForVisible();
    await s.struct.lessonSpace.gamePanel.math.click();

    await s.struct.lessonSpace.gamePanel.mathLevel(1).isChecked();
    await s.struct.lessonSpace.gamePanel.mathLevel(2).uncheck();

    // start
    await s.struct.lessonSpace.gamePanel.mathStart.waitForVisible();
    await s.struct.lessonSpace.gamePanel.mathStart.click();

    await s.struct.lessonSpace.gamePanel.whiteboardtools.waitForVisible();

    // submit  wrong answer 
    await s.struct.lessonSpace.gamePanel.mathInput.waitForVisible();
    await s.struct.lessonSpace.gamePanel.mathInput.fill('-20');
    await s.struct.lessonSpace.gamePanel.mathSubmit.waitForVisible();
    await s.struct.lessonSpace.gamePanel.mathSubmit.click();

    await (await s.page.waitForSelector('//div[contains(text(),"Not quite, try again!")]')).isVisible();

    // skip
    await s.struct.lessonSpace.gamePanel.mathSkip.waitForVisible();
    await s.struct.lessonSpace.gamePanel.mathSkip.click();

    await (await s.page.waitForSelector('//div[contains(text(),"The answer was")]')).isVisible();

    // go back
    await s.struct.lessonSpace.gamePanel.backToGames.waitForVisible();
    await s.struct.lessonSpace.gamePanel.backToGames.click();
    await s.page.waitForTimeout(200);

    await s.struct.lessonSpace.gamePanel.math.click();
    await s.struct.lessonSpace.gamePanel.mathLevel(2).waitForVisible();    
    await s.page.getByText('Advanced level: Decimals, fractions, and big numbers').click();

    // start
    await s.struct.lessonSpace.gamePanel.mathStart.waitForVisible();
    await s.struct.lessonSpace.gamePanel.mathStart.click();

    await s.struct.lessonSpace.gamePanel.whiteboardtools.waitForVisible();

    // submit  wrong answer 
    await s.struct.lessonSpace.gamePanel.mathInput.waitForVisible();
    await s.struct.lessonSpace.gamePanel.mathInput.fill('-20');
    await s.struct.lessonSpace.gamePanel.mathSubmit.waitForVisible();
    await s.struct.lessonSpace.gamePanel.mathSubmit.click();

    await (await s.page.waitForSelector('//div[contains(text(),"Not quite, try again!")]')).isVisible();

    // skip
    await s.struct.lessonSpace.gamePanel.mathSkip.waitForVisible();
    await s.struct.lessonSpace.gamePanel.mathSkip.click();

    await (await s.page.waitForSelector('//div[contains(text(),"The answer was")]')).isVisible();

    // go back
    await s.struct.lessonSpace.gamePanel.backToGames.waitForVisible();
    await s.struct.lessonSpace.gamePanel.backToGames.click();
    await s.page.waitForTimeout(200);

    //student cancel the request
    await s.struct.modals.notifyingTutors.content.cancel.waitForVisible();
    await s.struct.modals.notifyingTutors.content.cancel.click();
    await s.page.waitForTimeout(200);

    await s.struct.modals.confirmCancel.content.cancel.waitForVisible();
    await s.struct.modals.confirmCancel.content.cancel.click();
    await s.page.waitForTimeout(1000);

    // click on user menu
    await s.struct.header.userTools.username.click();
    await s.struct.userMenu.signOut.click();
    
  });

});
