const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({
        width: 1980,
        height: 1280
    });
    await page.goto('https://www.etsy.com/legal/ip/report');
    try {
        await page.waitForSelector('.btn-outline-blac', { timeout: 500 });
        await page.screenshot({path: 'img/etsy/etsy1.png'});
        page.click('.btn-outline-blac');

    } catch (error) {
        console.log("The element didn't appear.")
    }
    await page.screenshot({path: 'img/etsy/etsy2.png'});
    await page.click('.js-mine');
    await page.screenshot({path: 'img/etsy/etsy3.png'});
    await page.click('#start-form');
    await page.type('#contact-first-name', 'Roman');
    await page.type('#contact-last-name', 'Roman');
    await page.type('#organization', 'RRoman');
    await page.type('#address_1', 'Netherlands St, Nellmapius');
    await page.type('#address_2', 'Pretoria, 0122');
    await page.type('#city', 'Town');
    await page.type('#zip_code', '342');
    await page.type('#contact-email', 'roma@gmail.com');
    await page.type('#phone-number', '38099234234');
    await page.select('#countries', '268');
    await page.screenshot({path: 'img/etsy/etsy4.png'});
    await page.click('.text-right .btn-primary');


    await page.click('input[value="patent"]');
    await page.click('input[value="yes"]');
    await page.type('#owner-name', 'Owner');
    await page.type('#property-title', 'property-title');
    await page.click('input[name="patent-registration"]');
    await page.type('#property-identifier', '3534534');
    await page.type('#property-jurisdiction', '34534534534');
    await page.screenshot({path: 'img/etsy/etsy5.png'});
    await page.click('.text-right .btn-primary');

    await page.click('input[value="listing"]');
    await page.type('.input-group-body .input', 'https://www.etsy.com/listing/667817190/reserved-for-etsy-design-awards-cherry?ga_order=most_relevant&ga_search_type=all&ga_view_type=gallery&ga_search_query=etsy&ref=sc_gallery-1-1&plkey=8223680d84a50501843eef09ea4287096ad3c2fb%3A667817190&cns=1');
    await page.click('.input-group-btn .js-add-material');
    await page.waitForSelector('#remove-btn', {visible: true});
    await page.screenshot({path: 'img/etsy/etsy6.png'});

    await page.click('.text-right .btn-primary');

    await page.click('input[value="accurate"]');
    await page.click('.checkbox-custom .pb-xs-2');
    await page.type('#signature', 'Roman Roman');
    await page.screenshot({path: 'img/etsy/etsy7.png'});


    // await page.click('.js-submit');
    // console.log("click send form");
    // await page.screenshot({path: 'img/etsy/etsy8.png'});
    // await page.waitForSelector('.js-success-message', {visible: true});
    // await page.screenshot({path: 'img/etsy/etsy9.png'});
    await browser.close();

})();
