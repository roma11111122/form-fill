const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({
        width: 1980,
        height: 1280,
        deviceScaleFactor: 1,
    });
    await page.goto('https://allegro.secure.force.com/iprcontactform/#/form?_k=wli34a');
    await page.type('#notifyingName', 'notifyingName');
    await page.type('#applicantName', 'notifyingName');
    await page.type('#jobTitle', 'jobTitle');
    await page.type('#email', 'roma@mail.com');
    await page.type('#emailToSuppliers', 'roeeeeeeeeeeeeeema@mail.com');
    await page.type('#linkArea', 'https://allegro.pl/oferta/komputer-do-gier-core-i7-gtx-1660-ti-ddr6-16gb-w10-7897596433?bi_s=strk_specjalna_sg_pion&');
    await page.click('#confirmation');
    await page.select('#reason', 'Counterfeit');
    await page.screenshot({path: 'img/allegro/allegro.png'});
    // await page.click('button[type="button"]');
    // await page.waitForNavigation();
    // await page.screenshot({path: 'example2.png'});
    await browser.close();
})();
