import faker, {
    random
  } from "faker";
  import {product } from "../../lib/shared"; 
  
  it("tutor sign-in and get in line", async () => {
  
    for (let i = 0; i < 10; i++) {
  
      //create student
      const t = await createTutorInQueue();


      await t.struct.homepage.requestATutor.click();

    //   t.page.waitForTimeout(1000000);
    //     //tutor signs out
    //     await t.struct.tutorDashboard.header.userTools.username.click();
    //     await t.struct.userMenu.signOut.click();
      }
  }
  );
