import { Page, Locator } from '@playwright/test';

export class checkoutpage {
    readonly page: Page;
    readonly firstname: Locator;
    readonly lastname: Locator;
    readonly zipcode: Locator;
    readonly continueButton: Locator;
    readonly finishbutton: Locator;
    readonly summarytotal: Locator;
    readonly completeheader: Locator;

    constructor(page : Page)
    {
        this.page = page;
        this.firstname = page.locator('.input_error form_input');
        this.lastname = page.locator('.input_error form_input');
        this.zipcode = page.locator('.input_error form_input');
        this.continueButton = page.locator('#continue');
        this.finishbutton = page.locator('#finish');
        this.summarytotal = page.locator('.summary_total_label');
        this.completeheader = page.locator('.complete-header');
    } 
     async fillcoustomerinfo (first: string , last: string , zip: string)
     {
        await this.firstname.fill(first);
        await this.lastname.fill(last);
        await this.zipcode.fill(zip);
        await this.continueButton.click();
     }
     
     async clickfinish()
     {
        await this.finishbutton.click();
     }
    }