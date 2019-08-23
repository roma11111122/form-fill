const puppeteer = require('puppeteer');
const chromeOptions = {
    headless: false,
    defaultViewport: {width: 1366, height: 768},
    slowMo: 10
};


(async function main() {
    const browser = await puppeteer.launch(chromeOptions);
    const page = await browser.newPage();
    await page.setExtraHTTPHeaders(
        {
            'Cookies': 'org.springframework.web.servlet.i18n.CookieLocaleResolver.LOCALE=en_US; ipp_language_cookie_name=en_US; _tb_token_=cLJ1VqHz8t; isg=BIOD_3wx2rQwo5ZA8UvvNiR9Ek4n8BckEd6qfrVgx-JZdKOWPctLitzm6lyfVG8y; asip_user_tmp=78DB8B187F5E6EC68C47507043EF8C0C%05%7B%22asipEmail%22%3A%22enforcement_conair%40pointerbp.nl%22%2C%22asipId%22%3A24439355%2C%22asipName%22%3A%22PBP+Research+B.V.%22%2C%22enterUserInfoCount%22%3A2%2C%22loginSource%22%3A%22asip%22%2C%22sessionId%22%3A%221WmKC1LzM_0CcIsBdk7NGsg1%22%2C%22userId%22%3A3685326134%2C%22userNick%22%3A%22t-3685326134-0%22%7D; JSESSIONID=384F4976E24F57C4D559B313D2CB6CDC',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,uk;q=0.6,vi;q=0.5',
            'cache-control': 'no-cache',
            'pragma': 'no-cache',
            'upgrade-insecure-requests': '1',
            'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.80 Safari/537.36'
        },
    );
    await page.goto('https://ipp.alibabagroup.com/login.htm');

    let frames = await page.frames();
    let loginFrame = frames.find(f => f.url().indexOf("mini_login") > 0);
    await loginFrame.waitForSelector('#fm-login-id', {visible: true});
    await loginFrame.type('#fm-login-id', 'enforcement_conair@pointerbp.nl');
    await loginFrame.type('#fm-login-password', 'Plantenbak1');
    await loginFrame.click('#fm-login-submit');
    await loginFrame.waitForSelector('#nc_1_n1z', {visible: true});

    const sliderElement = await loginFrame.$('.slidetounlock');
    const slider = await sliderElement.boundingBox();
    const sliderHandler = await loginFrame.$('.nc_iconfont.btn_slide');
    const handle = await sliderHandler.boundingBox();

    await page.mouse.move(handle.x + handle.width / 2, handle.y + handle.height / 2);
    await page.mouse.down();
    await page.mouse.move(handle.x + slider.width, handle.y + handle.height / 2, {steps: 10});
    await page.mouse.up();
    await loginFrame.waitForSelector('[data-nc-lang="_yesTEXT"]');
    await loginFrame.click('#fm-login-submit');

    await page.waitForSelector('#J_sidebar', {timeout: 100000, visible: true});
    //await page.goto('https://ipp.alibabagroup.com/report/submitComplaint.htm');
    await page.goto('https://qinquan.taobao.com/complaint/complaint.htm?platform=ae&_localeChangeRedirectToken=1');

    await page.waitForSelector('.ant-col-12', {timeout: 100000, visible: true});
    await page.click('.ant-col-12 .ant-form-item-control');
    await page.keyboard.type('外观设计专利权');
    await page.click('.ant-col-8 .ant-select-selection__rendered');
    await page.keyboard.type('Miracurl design (US)(USD696456S)');
    await page.type('.ant-input', 'test comment', {delay: 20});
})();


