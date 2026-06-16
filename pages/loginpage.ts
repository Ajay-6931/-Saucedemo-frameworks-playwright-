import { Page ,Locator} from '@playwright/test';

export class loginpage{
    readonly page : Page;
    readonly usernameinput : Locator;
    readonly passwordinput  : Locator;
    readonly loginbutton : Locator;
    readonly errormessage : Locator;

    constructor(page: Page)
    {
        this.page = page
        this.usernameinput = page.locator('[data-test="username"]');
          this.passwordinput = page.locator('[data-test="password"]'); 
            this.loginbutton = page.locator('[data-test="login-button"]'); 
             this.errormessage = page.locator('[data-test="error"]'); 
    }

    async navigate()
    {
        await this.page.goto('/');
    }
async login(user:string , pass:string){
    await this.usernameinput.fill(user)
    await this.passwordinput.fill(pass)
}
}