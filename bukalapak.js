const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({
        width: 1980,
        height: 1280
    });
    await page.goto('https://www.bukalapak.com/bukabantuan/175/form');
    await page.waitForSelector('#alamat_perusahaan', {visible: true});
    await page.screenshot({path: 'img/bukalapak/bukalapak.png'});
    await page.type('#name', 'name');
    await page.type('#email', 'roma@mail.com');
    await page.type('#nama_pemilik', 'nama_pemilik');
    await page.type('#nomor_registrasi', '1234567890');
    await page.type('#website_perusahaan', 'website_perusahaan');
    await page.type('#alamat_perusahaan', 'alamat_perusahaan');
    await page.type('#alamat_email_pemilik_merek', 'anon@gmail.com');
    await page.type('#no_telepon_pelapor', '23423534543');
    await page.type('#body', 'some amazing detail min length 20 charset');
    const fileInput = await page.$('#link_barang_banyak');
    await fileInput.uploadFile('./allegro.png');
    await page.evaluate(() => {
        document.querySelector('input[name=pemilik_haki]').click();
    });
    await page.screenshot({path: 'img/bukalapak/bukalapak2.png'});
    await page.type('#nama_pemilik', 'anon anon');
    await page.click('.c-btn--red');
    await page.screenshot({path: 'img/bukalapak/bukalapak3.png'});
    await page.click('.c-checkbox');
    await page.screenshot({path: 'img/bukalapak/bukalapak4.png'});
    // await page.click('.c-remodal__panel__footer .c-btn--red');
    //
    // await page.waitForSelector('.router-link-active', {visible: true});
    //
    // await page.screenshot({path: 'img/bukalapak/bukalapak5.png'});
    await browser.close();
})();
